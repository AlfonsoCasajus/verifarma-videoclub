<template>
	<section>
		<Head>
			<Title>Verifarma - {{ $route.name }}</Title>
		</Head>
		<div class="banner-wrapper">
			<NuxtImg src="images/logos/logo-verifarma.svg"  alt="Logo de la empresa" />
			<div class="proyect-description">
				
				<p>Datos de prueba</p>
				<ul>
					<li>Usuario: info@verifarma.com</li>
					<li>Contraseña: 123321</li>
				</ul>
				<a href="https://github.com/AlfonsoCasajus/verifarma-videoclub">Repositorio de Github</a>
			</div>
		</div>
		<div class="auth-wrapper">
			 <div class="form-wrapper">
				<h1>{{ $route.name === 'Login' ? 'Iniciar Sesion' : 'Registro' }}</h1>
				 <slot />
			 </div>
		</div>
	</section>
</template>

<style scoped lang="scss">
	section {
		height: 100vh;
		width: 100vw;
		display: grid;
		grid-template-columns: 1fr 1fr;

		.banner-wrapper {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 1rem;
			background-color: #fafafa;

			&::before {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-image: url('@/public/images/movies-poster.jpg');
				filter: opacity(25%) grayscale(75%);
				z-index: 0;
			}

			img {
				position: relative;
				width: 60%;
				aspect-ratio: 1 / 1;
			}

			.proyect-description {
				position: relative;
				width: 70%;
				color: #fafafa;
				padding: 1rem;
				border-radius: 4px;
				background: rgb(1,203,146);
				box-shadow:
					0 4px 6px rgba(0, 0, 0, 0.1),
					0 1px 3px rgba(0, 0, 0, 0.08);
			}
		}
		
		.auth-wrapper {
			padding: 1rem;
			width: 100%;
			justify-self: flex-end;
			grid-column: 2 / 3;
			display: flex;
			align-items: center;
			justify-content: center;
			box-shadow:
				0 4px 6px rgba(0, 0, 0, 0.1),
				0 1px 3px rgba(0, 0, 0, 0.08);
			background-color: #14181C;
			color: #fafafa;

			.form-wrapper {
				width: 70%;

				h1 {
					font-size: 64px;
				}
			}
		}
	}
</style>