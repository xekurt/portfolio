import { Component, ElementRef, OnInit, OnDestroy, ViewChild, inject, HostListener } from '@angular/core';
import * as THREE from 'three';
import { ThemeService } from '../theme.service';
import { effect } from '@angular/core';

@Component({
    selector: 'app-three-scene',
    standalone: true,
    template: `<div #canvasContainer class="canvas-container"></div>`,
    styles: [`
    .canvas-container {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }
  `]
})
export class ThreeSceneComponent implements OnInit, OnDestroy {
    @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

    private scene!: THREE.Scene;
    private camera!: THREE.PerspectiveCamera;
    private renderer!: THREE.WebGLRenderer;
    private frameId: number | null = null;

    // Digital Constellation Properties
    private nodes: { pos: THREE.Vector3; vel: THREE.Vector3; mesh: THREE.Mesh }[] = [];
    private nodeCount = 120;
    private maxDistance = 2.5;
    private lineSegments!: THREE.LineSegments;
    private linesGeometry!: THREE.BufferGeometry;

    private particles!: THREE.Points;
    private mouse = new THREE.Vector2(-1000, -1000);
    private raycaster = new THREE.Raycaster();

    private themeService = inject(ThemeService);

    constructor() {
        effect(() => {
            const theme = this.themeService.currentTheme();
            this.updateColors(theme);
        });
    }

    ngOnInit() {
        this.initThree();
        this.animate();
    }

    ngOnDestroy() {
        if (this.frameId) {
            cancelAnimationFrame(this.frameId);
        }
        this.renderer.dispose();
    }

    @HostListener('window:resize')
    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    @HostListener('window:mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    private initThree() {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 8;

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);
        this.canvasContainer.nativeElement.style.cursor = 'pointer';

        // Navigation via Three.js click
        this.canvasContainer.nativeElement.addEventListener('click', () => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        });

        // 1. Create Nodes
        const nodeGeo = new THREE.SphereGeometry(0.04, 8, 8);
        const nodeMat = new THREE.MeshBasicMaterial({ color: 0xff3e3e });

        for (let i = 0; i < this.nodeCount; i++) {
            const pos = new THREE.Vector3(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 5
            );
            const vel = new THREE.Vector3(
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01
            );
            const mesh = new THREE.Mesh(nodeGeo, nodeMat.clone());
            mesh.position.copy(pos);
            this.scene.add(mesh);
            this.nodes.push({ pos, vel, mesh });
        }

        // 2. Create Lines (BufferGeometry for edges)
        this.linesGeometry = new THREE.BufferGeometry();
        const lineMat = new THREE.LineBasicMaterial({
            color: 0xff3e3e,
            transparent: true,
            opacity: 0.2
        });
        this.lineSegments = new THREE.LineSegments(this.linesGeometry, lineMat);
        this.scene.add(this.lineSegments);

        // 3. Particles Background
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1500;
        const posArray = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 20;
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.005,
            color: 0xff3e3e,
            transparent: true,
            opacity: 0.3
        });
        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);

        this.scene.add(new THREE.AmbientLight(0xffffff, 0.6));
        this.updateColors(this.themeService.currentTheme());
    }

    private updateColors(theme: 'light' | 'dark') {
        const color = theme === 'dark' ? 0xff3e3e : 0x2563eb;

        this.nodes.forEach(node => {
            (node.mesh.material as THREE.MeshBasicMaterial).color.setHex(color);
        });

        if (this.lineSegments) {
            (this.lineSegments.material as THREE.LineBasicMaterial).color.setHex(color);
        }

        if (this.particles) {
            (this.particles.material as THREE.PointsMaterial).color.setHex(color);
        }
    }

    private animate() {
        this.frameId = requestAnimationFrame(() => this.animate());

        // Raycast to find mouse position in 3D space
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const mouseWorldPos = new THREE.Vector3();
        this.raycaster.ray.intersectPlane(mousePlane, mouseWorldPos);

        const linePositions: number[] = [];

        this.nodes.forEach((node, i) => {
            // 1. Drift
            node.pos.add(node.vel);

            // 2. Bound check
            if (Math.abs(node.pos.x) > 8) node.vel.x *= -1;
            if (Math.abs(node.pos.y) > 6) node.vel.y *= -1;
            if (Math.abs(node.pos.z) > 4) node.vel.z *= -1;

            // 3. Mouse Gravity Effect
            const distToMouse = node.pos.distanceTo(mouseWorldPos);
            if (distToMouse < 4) {
                const force = (4 - distToMouse) * 0.02;
                const dir = new THREE.Vector3().subVectors(mouseWorldPos, node.pos).normalize();
                node.pos.add(dir.multiplyScalar(force));
            }

            node.mesh.position.copy(node.pos);

            // 4. Connect to other nodes
            for (let j = i + 1; j < this.nodes.length; j++) {
                const other = this.nodes[j];
                const dist = node.pos.distanceTo(other.pos);
                if (dist < this.maxDistance) {
                    linePositions.push(node.pos.x, node.pos.y, node.pos.z);
                    linePositions.push(other.pos.x, other.pos.y, other.pos.z);
                }
            }
        });

        // Update lines
        this.linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        this.linesGeometry.attributes['position'].needsUpdate = true;

        this.particles.rotation.y += 0.0005;
        this.renderer.render(this.scene, this.camera);
    }
}
