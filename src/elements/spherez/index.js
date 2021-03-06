import {
  Group, SphereGeometry, MeshNormalMaterial, Mesh
} from 'three'
import bind from '@dlmanning/bind'

export default class Spherez extends Group {
  constructor () {
    super()

    this.initialize = bind(this, this.initialize)
    this.update = bind(this, this.update)

    this.initialize()
  }

  initialize () {
    // up to 2000
    const numSpheres = 25
    const Geometry = new SphereGeometry(3, 32, 32)
    const Material = new MeshNormalMaterial()

    this.innerSpheres = []
    this.outerSpheres = []
    this.wayOuterSpheres = []

    for (let i = 0; i < numSpheres; i++) {
      const sphere = new Mesh(Geometry, Material)
      this.add(sphere)

      this.innerSpheres.push(sphere)
    }

    for (let i = 0; i < 50; i++) {
      const sphere = new Mesh(Geometry, Material)
      this.add(sphere)

      this.outerSpheres.push(sphere)
    }

    for (let i = 0; i < 100; i++) {
      const sphere = new Mesh(Geometry, Material)
      this.add(sphere)

      this.wayOuterSpheres.push(sphere)
    }
  }

  update (props) {
    const {
      time,
      opacity,
      spread,
      fuckFactor
    } = props

    const val = 0.001
    this.rotation.y += val

    this.innerSpheres.forEach((sphere, i) => {
      const theta = (0.001 * time) + (i / (this.children.length - 1)) * 2 * Math.PI * fuckFactor
      const chi = (0.001 * time) + (i / (this.children.length - 1)) * Math.PI * fuckFactor

      sphere.position.x = spread * Math.cos(theta) * Math.sin(chi)
      sphere.position.y = spread * Math.sin(theta) * Math.sin(chi)
      sphere.position.z = spread * Math.cos(chi)

      sphere.material.opacity = opacity
      sphere.material.transparent = true
    })

    this.outerSpheres.forEach((sphere, i) => {
      const theta = (0.001 * time) + (i / (this.children.length - 1)) * 2 * Math.PI * fuckFactor
      const chi = (0.001 * time) + (i / (this.children.length - 1)) * Math.PI * fuckFactor

      sphere.position.x = 2 * spread * Math.cos(theta) * Math.sin(chi)
      sphere.position.y = 2 * spread * Math.sin(theta) * Math.sin(chi)
      sphere.position.z = 2 * spread * Math.cos(chi)

      sphere.material.opacity = opacity
      sphere.material.transparent = true
    })

    this.wayOuterSpheres.forEach((sphere, i) => {
      const theta = (0.001 * time) + (i / (this.children.length - 1)) * 2 * Math.PI * fuckFactor
      const chi = (0.001 * time) + (i / (this.children.length - 1)) * Math.PI * fuckFactor

      sphere.position.x = 3 * spread * Math.cos(theta) * Math.sin(chi)
      sphere.position.y = 3 * spread * Math.sin(theta) * Math.sin(chi)
      sphere.position.z = 3 * spread * Math.cos(chi)

      sphere.material.opacity = opacity
      sphere.material.transparent = true
    })
  }
}
