import * as THREE from 'three';

export class Terrain extends THREE.Mesh {
    constructor(width, height) {
        super();

        this.width = width;
        this.height = height;
        this.treeCount = 10;
        this.rockCount = 20;

        this.createTerrain();
        this.createTrees();
        this.createRock();
    }


    createTerrain(){
        if (this.terrain) {
            this.terrain.geometry.dispose();
            this.terrain.material.dispose();
            this.remove(this.terrain);
        }

        const terrainMaterial = new THREE.MeshStandardMaterial({
            color : 0x36e520, 
            //wireframe : true,
        }); 
        const terrainGeometry = new THREE.PlaneGeometry(
            this.width, this.height, this.width, this.height
        );
        this.terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);

        this.terrain.position.set(this.width/2, 0, this.height/2);
        this.terrain.rotation.x = -Math.PI/2;
        this.add(this.terrain);
    }


    createTrees() {
        const treeRadius = 0.2;
        const treeHeight = 3;

        this.trees = new THREE.Group();
        this.add(this.trees);

        const treeGeometry = new THREE.ConeGeometry(treeRadius, treeHeight, 8);
        const treeMaterial = new THREE.MeshStandardMaterial({color : 0x305010});

        for(let i=0; i< this.treeCount; i++) {
            const treeMesh = new THREE.Mesh(treeGeometry, treeMaterial);
            treeMesh.position.set(
                Math.floor(this.width * Math.random()) + 0.5, 
                treeHeight / 2, 
                Math.floor(this.height * Math.random())+0.5
            );

            this.trees.add(treeMesh);
        }
    }

    createRock() {
        const minRockRadius = 0.1;
        const maxRockRadius = 0.25;
        const minRockHeight = 0.5;
        const maxRockHeight = 0.8;
        
        const rockMaterial = new THREE.MeshStandardMaterial({
            color : 0xb0b0b0, 
            flatShading : true,
        });
        
        this.rocks = new THREE.Group();
        this.add(this.rocks);
        
        for(let i=0; i< this.rockCount; i++) {
            const radius = minRockRadius + (Math.random() * (maxRockRadius-minRockRadius)) ;
            const height = minRockHeight + (Math.random() * (maxRockHeight-minRockHeight)) ;

            const rockGeometry = new THREE.SphereGeometry(radius, 6, 5);
            const rockMesh = new THREE.Mesh(rockGeometry, rockMaterial);
            rockMesh.position.set(
                Math.floor(this.width * Math.random()) + 0.5, 
                0, 
                Math.floor(this.height * Math.random())+0.5
            );
            rockMesh.scale.y = height;

            this.rocks.add(rockMesh);
        }
    }
}