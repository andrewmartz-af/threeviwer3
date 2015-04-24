Template.uploads.events({
  'change .myFileInput':function(evt,tmpl){
    FS.Utility.eachFile(evt,function(file){
      //var theFile = new FS.File(file);
      theFile.creatorId = Meteor.userId();
      theFile.project = Session.get('active_project');
      //Uploads.insert(theFile,function(err,fileObj){
		STLs.insert(theFile,function(err,fileObj){
        if(!err){
          //do something if there is no error.
        }
      })
    })
  }
});
Template.uploads.helpers({
  uploads:function(){
    return Uploads.find({project:Session.get('active_project')});
  }
});

Template.control.helpers({
  uploads:function(){
    return Uploads.find({project:Session.get('active_project')});
  }
});




/// this is an experiment based off of client.js from https://github.com/2016rshah/three-js-meteor/blob/master/client/client.js

Template.control.rendered = function () {
	var container, stats;
    var WIDTH = window.innerWidth / 2;
    var HEIGHT = window.innerHeight/2;

		var camera, controls, scene, renderer;

		init();
		render();

		function animate() {

			requestAnimationFrame(animate);
			controls.update();

		}

		function init() {

			camera = new THREE.PerspectiveCamera( 60, 1, 1, 1000 );
			camera.aspect = (window.innerWidth/2) / (window.innerHeight/2);
			camera.position.z = -100;

			controls = new THREE.OrbitControls( camera, container );
			controls.damping = 0.1;
			controls.addEventListener( 'change', render );

			scene = new THREE.Scene();
			//scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

			// world

			//var geometry = new THREE.CylinderGeometry( 0, 10, 30, 4, 1 );
			//var material =  new THREE.MeshLambertMaterial( { color:0xffffff, shading: THREE.FlatShading } );
			/////////////////////////////////
				var loader = new THREE.STLLoader ();
				loader.addEventListener( 'load', function ( event) 	{
					var geometry = event.content;
		
					var material = new THREE.MeshLambertMaterial( {color: 0xffffff } );
					object = new THREE.Mesh (geometry, material );
		
					object.material.ambient = object.material.color;
					object.material.shading = THREE.SmoothShading;
							
					object.position.set (0,0,0);
					object.scale.set (1,1,1);
		
				//	object.geometry.computeBoundingBox();

				//	var boundingBox = object.geometry.boundingBox;

				//	var position = new THREE.Vector3();
				//	position.subVectors( boundingBox.max, boundingBox.min );
				//	position.multiplyScalar( 0.5 );
				//	position.add( boundingBox.min );
//
//					position.applyMatrix4( object.matrixWorld );
//	
//					object.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( -(position.x), -(position.y), -(position.z) ) );
//					object.geometry.verticesNeedUpdate = true;
//			
//					object.position.x = position.x;
//					object.position.y = position.y;
//					object.position.z = position.z;
		
					scene.add( object );

					//object.name = objects.length;
		
					object.castShadow = true;
					object.receiveShadow = true;
	
/// this objects push allows the mesh to move
				//	objects.push( object );
		
					//parameters.selected_object = object.name;
				} );
				var stl = Uploads.find({project:Session.get('active_project')});
				/// for loop for the loader
				//for (i = 0; i<stl.length; i++) {
					loader.load( '' )
				//};
			//	
			//	////////////////////////////////////////////////////////////////////////////////////////
			//for ( var i = 0; i < 10; i ++ ) {
				
			//	var mesh = new THREE.Mesh( geometry, material );
			//	mesh.position.x = ( Math.random() - 0.5 ) * 10;
			//	mesh.position.y = ( Math.random() - 0.5 ) * 10;
			//	mesh.position.z = ( Math.random() - 0.5 ) * 10;
			//	mesh.updateMatrix();
			//	mesh.matrixAutoUpdate = false;
			//	scene.add( mesh );

		//	}


			// lights

			light = new THREE.DirectionalLight( 0xffffff );
			light.position.set( 1, 1, 1 );
			scene.add( light );

			light = new THREE.DirectionalLight( 0x002288 );
			light.position.set( -1, -1, -1 );
			scene.add( light );

			light = new THREE.AmbientLight( 0x222222 );
			scene.add( light );


			// renderer

			renderer = new THREE.WebGLRenderer( { antialias: true } );
			renderer.setClearColor( 0xcccccc );
			renderer.setPixelRatio( window.devicePixelRatio );
			//renderer.setSize( window.innerWidth, window.innerHeight );
			renderer.setSize(WIDTH, HEIGHT);

			container = document.getElementById( 'control' );
			container.appendChild( renderer.domElement );

			stats = new Stats();
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.top = '0px';
			stats.domElement.style.zIndex = 100;
			container.appendChild( stats.domElement );

			//

			window.addEventListener( 'resize', onWindowResize, false );

			animate();
		

		}

		function onWindowResize() {

			camera.aspect = (window.innerWidth/2) / (window.innerHeight/2);
			camera.updateProjectionMatrix();

			renderer.setSize( window.innerWidth/2, HEIGHT );

			render();
		}

		function render() {

			renderer.render( scene, camera );
			stats.update();

		}
	};