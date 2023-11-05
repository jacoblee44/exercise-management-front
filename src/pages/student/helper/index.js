import api from "../../../lib/api";

export const getExerciseId = () => {
  const location = window.location.pathname;
  return location.split("/")[2];
};

export async function getExericseName() {
  let id = getExerciseId();
  return api.get("/api/student/get-exercise-name", {
    exercise: id
  });
}

export default getExericseName;
