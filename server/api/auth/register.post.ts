export default defineEventHandler(async (event) => {
	const { email, password } = await readBody(event);

    // registerUser(email, password);

	// TODO: Add user in db
	return {
	  message: 'Usuario registrado con exito'
	}
  })