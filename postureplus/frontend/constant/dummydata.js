const categories = [
  {
    id: 0,
    title: "CHEST",
    thumbnail: require("../assets/images/categories/bg_chest.png"),
    category: require("../assets/images/categories/categories-chest.png"),
  },
  {
    id: 1,
    title: "ABS",
    thumbnail: require("../assets/images/categories/bg_abs.png"),
    category: require("../assets/images/categories/categories-abs.png"),
  },
  {
    id: 2,
    title: "LEG",
    thumbnail: require("../assets/images/categories/bg_leg.png"),
    category: require("../assets/images/categories/categories-leg.png"),
  },
  {
    id: 3,
    title: "ARM",
    thumbnail: require("../assets/images/categories/bg_arm.png"),
    category: require("../assets/images/categories/categories-arm.png"),
  },
];

const recommended = [
  {
    id: 1,
    name: "Push up",
    reps: "5-10",
    category: "CHEST",
    difficulty: "Easy",
    duration: "30s",
    image: require("../assets/images/exercisesCard/chest/easy-pushup.png"),
    overviewImage: require("../assets/images/exercisesCard/chest/easy-pushup.png"),
    video: require("../assets/videos/pushup.mp4"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    pose: "PushUp",
  },
  // const dumbbell_floor_press =
  {
    id: 2,
    name: "Dumbbell Floor Press",
    reps: "10-15",
    category: "CHEST",
    difficulty: "Easy",
    duration: "20s",
    image: require("../assets/images/exercisesCard/chest/easy-dumbbell-floor-press.png"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    pose: "DumbbellFloorPress",
  },

  // const knee_pushup =
  {
    id: 3,
    name: "Knee Pushup",
    reps: "10-15",
    category: "CHEST",
    difficulty: "Easy",
    duration: "30s",
    image: require("../assets/images/exercisesCard/chest/easy-knee-pushup.png"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
  },
  // const triceps_bench_dip =
  {
    id: 4,
    name: "Triceps Bench Dip",
    reps: "5-10",
    category: "CHEST",
    difficulty: "Easy",
    duration: "30s",
    image: require("../assets/images/exercisesCard/chest/easy-triceps-bench-dip.png"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
  },
];

const difficulties = [
  {
    id: 0,
    name: "Easy",
  },
  {
    id: 1,
    name: "Medium",
  },
  {
    id: 2,
    name: "Hard",
  },
  {
    id: 3,
    name: "Favorites",
  },
  {
    id: 4,
    name: "Trending",
  },
];

//-------------------
//EXERCISES:
//-------------------

// const exercises = [
//     pushup, band_pushup, dumbbell_floor_press, knee_pushup, triceps_bench_dip, band_chest_press,dumbbell_bench_press, diamond_pushup, feet_elevated_pushup
// ]

//____________________ CHEST ______________________________
//chest-easy
const exercises = [
  {
    id: 1,
    name: "Push up",
    reps: "5-10",
    category: "CHEST",
    difficulty: "Easy",
    duration: "30s",
    image: require("../assets/images/exercisesCard/chest/easy-pushup.png"),
    overviewImage: require("../assets/images/exercisesCard/chest/easy-pushup.png"),
    video: require("../assets/videos/pushup.mp4"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    pose: "PushUp",
    favorites: false,
  },
  // const dumbbell_floor_press =
  {
    id: 2,
    name: "Dumbbell Floor Press",
    reps: "10-15",
    category: "CHEST",
    difficulty: "Easy",
    duration: "20s",
    image: require("../assets/images/exercisesCard/chest/easy-dumbbell-floor-press.png"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    pose: "DumbbellFloorPress",
    favorites: false,
  },

  // const knee_pushup =
  {
    id: 3,
    name: "Knee Pushup",
    reps: "10-15",
    category: "CHEST",
    difficulty: "Easy",
    duration: "30s",
    image: require("../assets/images/exercisesCard/chest/easy-knee-pushup.png"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  // const triceps_bench_dip =
  {
    id: 4,
    name: "Triceps Bench Dip",
    reps: "5-10",
    category: "CHEST",
    difficulty: "Easy",
    duration: "30s",
    image: require("../assets/images/exercisesCard/chest/easy-triceps-bench-dip.png"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  //chest-medium
  // const band_pushup =
  {
    id: 5,
    name: "Band Pushup",
    reps: "5-10",
    category: "CHEST",
    difficulty: "Medium",
    duration: "30s",
    image: require("../assets/images/exercisesCard/chest/medium-band-pushup.png"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  //const band_chest_press =
  {
    id: 6,
    name: "Band Chest Press",
    reps: "5-10",
    category: "CHEST",
    difficulty: "Medium",
    duration: "30s",
    image: require("../assets/images/exercisesCard/chest/medium-band-chest-press.png"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  // const dumbbell_bench_press =
  {
    id: 7,
    name: "Dumbbell Bench Press",
    reps: "5-10",
    category: "CHEST",
    difficulty: "Medium",
    duration: "30s",
    image: require("../assets/images/exercisesCard/chest/medium-dumbbell-bench-press.png"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  //chest-hard
  //const diamond_pushup =
  {
    id: 8,
    name: "Diamond Pushup",
    reps: "5-10",
    category: "CHEST",
    difficulty: "Hard",
    duration: "30s",
    image: require("../assets/images/exercisesCard/chest/hard-diamond-pushup.png"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  //const feet_elevated_pushup =
  {
    id: 9,
    name: "Feet Elevated Pushup",
    reps: "5-10",
    category: "CHEST",
    difficulty: "Hard",
    duration: "30s",
    image: require("../assets/images/exercisesCard/chest/hard-feet-elevated-pushup.png"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  {
    id: 10,
    name: "Basic Crunch",
    reps: "10-20",
    category: "ABS",
    difficulty: "Easy",
    duration: "30s",
    image: require("../assets/images/exercisesCard/abs/basic-crunch.jpg"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  {
    id: 11,
    name: "Overhead Side Bend",
    reps: "10-20",
    category: "ABS",
    difficulty: "Easy",
    duration: "40s",
    image: require("../assets/images/exercisesCard/abs/overhead-side-bend.jpg"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  {
    id: 12,
    name: "Plank Jacks",
    reps: "10-15",
    category: "ABS",
    difficulty: "Easy",
    duration: "25s",
    image: require("../assets/images/exercisesCard/abs/plank-jacks.jpg"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  {
    id: 13,
    name: "Elbow Plank Twist",
    reps: "15-30",
    category: "ABS",
    difficulty: "Medium",
    duration: "40s",
    image: require("../assets/images/exercisesCard/abs/side-elbow-plank-twist.jpg"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  {
    id: 14,
    name: "Superman Lift",
    reps: "5-10",
    category: "ABS",
    difficulty: "Medium",
    duration: "40s",
    image: require("../assets/images/exercisesCard/abs/superman-lift.jpg"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  {
    id: 15,
    name: "Seated Russian Twist",
    reps: "5-15",
    category: "ABS",
    difficulty: "Hard",
    duration: "40s",
    image: require("../assets/images/exercisesCard/abs/seated-russian-twist.jpg"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  {
    id: 16,
    name: "Bicep Overhead Press",
    reps: "15-30",
    category: "ARM",
    difficulty: "Easy",
    duration: "40s",
    image: require("../assets/images/exercisesCard/arm/bicep-overhead-press.jpg"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  {
    id: 17,
    name: "Lateral Arm Raise",
    reps: "10-20",
    category: "ARM",
    difficulty: "Medium",
    duration: "40s",
    image: require("../assets/images/exercisesCard/arm/lateral-arm-raise.jpg"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  {
    id: 18,
    name: "Overhead Triceps Extensions",
    reps: "10-20",
    category: "ARM",
    difficulty: "Medium",
    duration: "40s",
    image: require("../assets/images/exercisesCard/arm/overhead-triceps-extensions.jpg"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  {
    id: 19,
    name: "Plank Dumbbell Row",
    reps: "15-20",
    category: "ARM",
    difficulty: "Medium",
    duration: "60s",
    image: require("../assets/images/exercisesCard/arm/plank-dumbbell-row.jpg"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  {
    id: 20,
    name: "Standing Russian Twist",
    reps: "20-30",
    category: "ARM",
    difficulty: "Easy",
    duration: "60s",
    image: require("../assets/images/exercisesCard/arm/standing-russian-twist.jpg"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  {
    id: 21,
    name: "Triceps Kickback",
    reps: "15-20",
    category: "ARM",
    difficulty: "Hard",
    duration: "60s",
    image: require("../assets/images/exercisesCard/arm/triceps-kickback.jpg"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  {
    id: 22,
    name: "Upright Row",
    reps: "10-20",
    category: "ARM",
    difficulty: "Medium",
    duration: "45s",
    image: require("../assets/images/exercisesCard/arm/upright-row.jpg"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  {
    id: 23,
    name: "V-sit Chest Fly",
    reps: "10-15",
    category: "ARM",
    difficulty: "Hard",
    duration: "60s",
    image: require("../assets/images/exercisesCard/arm/v-sit-chest-fly.jpg"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  {
    id: 24,
    name: "Barbell Squat",
    reps: "10-15",
    category: "LEG",
    difficulty: "Hard",
    duration: "60s",
    image: require("../assets/images/exercisesCard/leg/barbell-squat.jpg"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  {
    id: 25,
    name: "Bridge Squeeze",
    reps: "15-20",
    category: "LEG",
    difficulty: "Easy",
    duration: "60s",
    image: require("../assets/images/exercisesCard/leg/bridge-squeeze.jpg"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  {
    id: 26,
    name: "Elbow Plank Leg Lift",
    reps: "15-20",
    category: "LEG",
    difficulty: "Medium",
    duration: "45s",
    image: require("../assets/images/exercisesCard/leg/elbow-plank-leg-lift.jpg"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  {
    id: 27,
    name: "Glider Side Lunge",
    reps: "10-20",
    category: "LEG",
    difficulty: "Easy",
    duration: "60s",
    image: require("../assets/images/exercisesCard/leg/glider-side-lunge.jpg"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  {
    id: 28,
    name: "Goblet Squat Kettlebell",
    reps: "10-20",
    category: "LEG",
    difficulty: "Medium",
    duration: "60s",
    image: require("../assets/images/exercisesCard/leg/goblet-squat-kettlebell.jpg"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  {
    id: 29,
    name: "Glider Side Lunge",
    reps: "10-15",
    category: "LEG",
    difficulty: "Easy",
    duration: "40s",
    image: require("../assets/images/exercisesCard/leg/pile-squat.jpg"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  {
    id: 30,
    name: "Plyometric Squat",
    reps: "5-10",
    category: "LEG",
    difficulty: "Hard",
    duration: "60s",
    image: require("../assets/images/exercisesCard/leg/plyometric-squat.jpg"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
  {
    id: 31,
    name: "Side Lunge Curtsy",
    reps: "15-20",
    category: "LEG",
    difficulty: "Easy",
    duration: "60s",
    image: require("../assets/images/exercisesCard/leg/side-lunge-curtsy.jpg"),
    thumbnail: require("../assets/images/thumbnails/pushup_thumbnail.png"),
    favorites: false,
  },
];
//_____________________________________________________

export default {
  categories,
  recommended,
  difficulties,
  exercises,
};
