export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)
  console.log(email, password)

  // registerUser(email, password);

  // TODO: Add user in db
  return {
    message: 'Usuario registrado con exito'
  }
})
