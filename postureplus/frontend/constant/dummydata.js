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
];
//_____________________________________________________

export default {
  categories,
  recommended,
  difficulties,
  exercises,
};
