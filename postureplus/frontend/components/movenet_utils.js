const ScoreThreshold = 0.4;

let detector;
let poses;
let video;
let screenAspect;
let videoAspect;

async function init() {
	console.log("initializing");
	const detectorConfig = {
		modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
	};
	detector = await poseDetection.createDetector(
		poseDetection.SupportedModels.MoveNet,
		detectorConfig
	);
}

async function videoReady() {
	console.log("video ready");
	await getPoses();
}

async function setup() {
	createCanvas(windowWidth, windowHeight);
	screenAspect = windowWidth / windowHeight;
	textSize(16);
	textAlign(CENTER, CENTER);

	await init();

	video = createCapture(VIDEO, videoReady);
	videoAspect = video.width / video.height;
	video.hide();

	//createButton('pose').mousePressed(getPoses)
	console.log("setup complete");
}

async function getPoses() {
	poses = await detector.estimatePoses(video.elt);
	setTimeout(getPoses, 0);
}

let first = true;

function mouseClicked() {
	console.log(poses);
}

// A list of pairs of either keypoint indices or sub lists of keypoint indicies
// Each pair defines an edge in the skeleton "graph"
// When a pair contains a sublist, that is meant to represent the average of two keypoints
const skeleton = [
	[0, 1],
	[0, 2],
	[1, 3],
	[2, 4],
	[0, [6, 5]],
	[6, 5],
	[5, 7],
	[6, 8],
	[7, 9],
	[8, 10],
	[
		[5, 6],
		[11, 12]
	],
	[
		[11, 12], 11
	],
	[
		[11, 12], 12
	],
	[11, 13],
	[12, 14],
	[13, 15],
	[14, 16],
];

function getKeypointForEdgeVertex(keypoints, vertex) {
	if (typeof vertex === "number") {
		const {
			x,
			y,
			score
		} = keypoints[vertex];
		if (score > ScoreThreshold) {
			return { x, y };
		}
	} else if (vertex instanceof Array) {
		const points = vertex.map(v => keypoints[v]);
		if (points.every(kp => kp.score > ScoreThreshold)) {
			const { x, y } =
						// Average the points
						points.reduce(
							(acc, v) => ({
								x: (acc.x * acc.w + v.x) / (acc.w + 1),
								y: (acc.y * acc.w + v.y) / (acc.w + 1),
								w: acc.w + 1
							}),
							{ x: 0, y: 0, w: 0 }
						);
		  return { x, y };
		}
	}
}

// function mouseClicked() {
// 	console.log(`screen aspect ${screenAspect.toFixed(2)}`);
// 	console.log(`video aspect ${videoAspect.toFixed(2)}`);
// 	debugger;
// }

function draw() {
	if (first) {
		console.log("drawing");
		first = false;
	}
	background(220);
	if (video) {
		let vw, vh;
		// This isn't valid during setup() for some reason
	  videoAspect = video.width / video.height;
		if (screenAspect >= videoAspect) {
			// The screen is wider than the video
			vh = height;
			vw = height * videoAspect;
		} else {
			// The video is wider than the screen
			vw = width;
			vh = width / videoAspect;
		}
		push();
		// Mirror the video
		scale(-1, 1);
		translate(-vw, 0);
		image(video, 0, 0, vw, vh);
		pop();
		// One way to adjust the skeleton to match the video size would be to use
		// scale():
		//     scale(vw / video.width, vh / video.height);
		// However this scales stroke an text size as well. And if we wanted to flip
		// the skeleton horinontally (using a negative scaling factor in the x axis),
		// this would also flip the text.
		//
		// To only adjust position we can use the map() function like so:
		//     map(x, 0, video.width, vw, 0)
		// Note that the ordering of the input range and output range is flipped in
		// order to mirror the skeleton.
		
		// helper functions
		const mapX = (x) => map(x, 0, video.width, vw, 0);
		const mapY = (y) => map(y, 0, video.height, 0, vh);
		
		if (poses && poses.length > 0) {
			//console.log(poses[0].keypoints.length)
			//console.log(poses[0].keypoints[0].x);
			stroke('green');
			strokeWeight(2);
			for (let edge of skeleton) {
				let start = getKeypointForEdgeVertex(poses[0].keypoints, edge[0]);
				let end = getKeypointForEdgeVertex(poses[0].keypoints, edge[1]);

				if (start && end) {
					line(
						mapX(start.x),
						mapY(start.y),
						mapX(end.x),
						mapY(end.y)
					);
				}
			}

			for (let i = 0; i < poses[0].keypoints.length; i++) {
				const {
					x,
					y,
					score
				} = poses[0].keypoints[i];
				// console.log(kp);
				if (score > ScoreThreshold) {
					fill(255);
					stroke(0);
					strokeWeight(4);
					circle(mapX(x), mapY(y), 16);

					push();
					fill('red');
					noStroke();
					text(`${i}`, mapX(x), mapY(y));
					pop();
				}
			}
		}
	}
}