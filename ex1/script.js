function main () {
    const canvas = document.querySelector('#c')
    const renderer = new THREE.WebGLRenderer({canvas})
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 5)
    camera.position.z = 2

    {
        const light = new THREE.DirectionalLight(0xFFFFFF, 1)
        light.position.set(-1, 2, 4)
        scene.add(light)
    }

    const geometry = new THREE.BoxGeometry(1,1,1)

    const cubes = [
        makeInstance(geometry, 0xffaa44, 0),
        makeInstance(geometry, 0xffaa44, -2),
        makeInstance(geometry, 0xffaa44, 2),
    ]

    function makeInstance (geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({color: color})
        const cube = new THREE.Mesh(geometry, material)
        cube.position.x = x
        scene.add(cube)
        return cube
    }

    function render (time) {
        time *= 0.001

        if(resizeRenderer(renderer)) {
            const canvas = renderer.domElement
            camera.aspect = canvas.clientWidth / canvas.clientHeight
            camera.updateProjectionMatrix()
        }

        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * .1
            const rot = time * speed
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        })

        renderer.render(scene, camera)

        requestAnimationFrame(render)
    }

    function resizeRenderer(renderer) {
        const canvas = renderer.domElement
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        const needResize = canvas.width !== width || canvas.height !== height
        if(needResize) {
            renderer.setSize(width, height, false)
        }
        return needResize
    }

    requestAnimationFrame(render)

}
main()
