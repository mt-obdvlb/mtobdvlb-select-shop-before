import { createPinia } from "pinia"
import piniaPluginPersistenceOptions from "pinia-plugin-persistedstate"

export const pinia = createPinia()
pinia.use(piniaPluginPersistenceOptions)

export default pinia