function main () {
    const canvas = document.querySelector('#c')
    const renderer = new THREE.WebGLRenderer({canvas})
    const scene = new THREE.Scene()



    ///We create an camera
    const fov = 75
    const aspect = 2
    const near = 0.1
    const far = 5
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.z = 2

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
    }

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    // const material = new THREE.MeshBasicMaterial({color: 0x44aa88})
    // const mesh = new THREE.Mesh(geometry, material)
    // scene.add(mesh)

    function makeInstance (geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({color: color})
        const cube = new THREE.Mesh(geometry, material)

        cube.position.x = x

        scene.add(cube)
        return cube
    }

    const cubes = [
        makeInstance(geometry, 0x44aa88, 0),
        makeInstance(geometry, 0x4488aa, -2),
        makeInstance(geometry, 0x88aa44, 2)
    ]

    function render (time) {
        time *= 0.001
        const canvas = renderer.domElement
        camera.aspect = canvas.clientWidth / canvas.clientHeight
        camera.updateProjectionMatrix()

        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx *.1
            const rot = time * speed

            cube.rotation.x = rot;
            cube.rotation.y = rot;

            const  canvas = render

            scene.add(cube);

        })



        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
}

main()