export async function login(req, res, next) {


  const result = {
    foo: "bar",
  }
  try {
    res.json(result);
  } catch (err) {
    console.error(`Error while getting programming languages`, err.message);
    next(err);
  }
}