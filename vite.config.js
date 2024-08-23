import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  /* base: "/TIF_PRGO3/", *///PARA CONFIGURAR CUANDO HAGAMOS DEPLOY TENER ENCUENTA QUE EL ENTRY POINT SE MOVERA PARA CORREGIR ESTO DEBEMOS HACER UNA CORRECION EN EL ROUTER
})
