<template>
  <section>
    <Head>
      <Title>VideoFarma - Alfonso Casajus</Title>
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    </Head>
    <q-layout container style="height: 100vh">
      <q-header elevated>
        <q-toolbar class="navigation">
          <span class="logo-nav">
            <NuxtImg v-if="!$q.screen.lt.md" src="images/logos/logo-verifarma.svg" alt="Logo de la empresa" />

            <q-btn-toggle
              :model-value="selectedMenuItem"
              flat
              toggle-color="blue"
              :size="$q.screen.lt.md ? '12px' : '18px'"
              :options="navMenu"
              @update:model-value="handleNavigation"
            />
          </span>
          <q-btn flat round dense icon="more_vert">
            <q-menu auto-close>
              <q-list>
                <q-item clickable disabled class="menu-item">
                  <q-tooltip anchor="center left">
                    Deshabilitado
                  </q-tooltip>
                  <q-icon name="settings" class="icon" />Ajustes
                </q-item>
                <q-separator />
                <q-item clickable class="menu-item" @click="logOut">
                  <q-icon name="logout" class="icon" />Salir
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page class="body-wrapper">
          <slot />
        </q-page>
      </q-page-container>
    </q-layout>
  </section>
</template>
<script setup lang="ts">
const router = useRouter()

const authStore = useAuthStore()

const logOut = () => {
  authStore.logout()
  router.push({ name: 'Login' })
}

const selectedMenuItem = ('two')

const navMenu = [
  { label: 'Todas', value: 'all' },
  { label: 'Peliculas', value: 'movie' },
  { label: 'Series', value: 'series' },
  { label: 'Episodios', value: 'episode' }
]

const handleNavigation = (selectedItemValue: string) => {
  router.push({ path: `/browse/genre/${selectedItemValue}` })
}

</script>

<style scoped lang="scss">
.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgb(1,203,146);
  background: linear-gradient(
    90deg, rgba(1,203,146,1) 0%,
    rgba(13,176,196,1) 30%,
    rgba(54,139,243,1) 62%,
    rgba(121,107,249,1) 82%,
    rgba(148,94,252,1) 100%
  ) !important;

    .logo-nav {
      display: flex;
      align-items: center;

      img {
        width: 125px;
        margin-right: 1.5rem;
      }
    }

}

.menu-item {
  width: 100% !important;
  display: flex;
  align-items: center;

  .icon {
    margin-right: 0.25rem;
  }
}

.body-wrapper {
  padding: 1rem;
  background-color: #14181C;
  color: #fafafa;
}
</style>
