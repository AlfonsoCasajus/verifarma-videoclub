export default defineEventHandler(async (event) => {
	const { email, password } = await readBody(event);

	// TODO: bcrypt password
	if (email !== 'info@verifarma.com' || password !== '123321') {
		return {
			message: 'Email o contraseña incorrectos'
		}
	}
	
	return {
	  message: 'Ingreso exitoso',
	  token: 'abc-123'
	}
  })