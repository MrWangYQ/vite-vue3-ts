declare module '*.vue' {
  import { type DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/ban-types
  const componnet: DefineComponent<{}, {}, any>
  export default componnet
}
