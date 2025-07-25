export default async function getAllTeacherClassroom(token: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}classroom`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
