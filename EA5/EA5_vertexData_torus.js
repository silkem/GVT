var torus = ( function() {

	function createVertexData() {
		var n = 40;
        var m = 15;
        var R = 0.7;
        var r = 0.1;
        var a = 1.5;
        var du = 2 * Math.PI / n;
        var dv = 2 * Math.PI / m;

        // Counter for entries in index array.
        let iLines = 0;
        let iTris = 0;

        // Positions.
		this.vertices = new Float32Array(3 * (n + 1) * (m + 1));
		var vertices = this.vertices;

        // Normals.
        this.normals = new Float32Array(3 * (n + 1) * (m + 1));
        var normals = this.normals;

        // Index data.
        this.indicesLines = new Uint16Array(2 * 2 * n * m);
        var indicesLines = this.indicesLines;
        this.indicesTris = new Uint16Array(3 * 2 * n * m);
        var indicesTris = this.indicesTris;

        // Loop angle u.
        for (let i = 0, u = -1; i <= n; i++, u += du) {
            // Loop height v.
            for (let j = 0, v = -1; j <= m; j++, v += dv) {
                var iVertex = i * (m + 1) + j;
                var z = (-R + r * Math.cos(v) * (a + Math.sin(u))) * Math.cos(u);
                var x = (-R + r * Math.cos(v) * (a + Math.sin(u))) * Math.sin(u);
                var y =  r * Math.sin(v) * (a + Math.sin(u));

                var offsetX = 0;
                var offsetY = 1;
                var offsetZ = 0;

                // Set vertex positions.
                vertices[iVertex * 3] = x + offsetX;
                vertices[iVertex * 3 + 1] = y + offsetY;
                vertices[iVertex * 3 + 2] = z + offsetZ;
					
                // Calc and set normals.
                var nx = Math.cos(u) * Math.cos(v);
                var ny = Math.cos(u) * Math.sin(v);
                var nz = Math.sin(u);
                normals[iVertex * 3] = nx;
                normals[iVertex * 3 + 1] = ny;
                normals[iVertex * 3 + 2] = nz;

                // Set index.
                // Line on beam.
                if (j > 0 && i > 0) {
                    indicesLines[iLines++] = iVertex - 1;
                    indicesLines[iLines++] = iVertex;
                }
                // Line on ring.
                if (j > 0 && i > 0) {
                    indicesLines[iLines++] = iVertex - (m + 1);
                    indicesLines[iLines++] = iVertex;
                }

                // Set index.
                // Two Triangles.
                if (j > 0 && i > 0) {
                    indicesTris[iTris++] = iVertex;
                    indicesTris[iTris++] = iVertex - 1;
                    indicesTris[iTris++] = iVertex - (m + 1);

                    indicesTris[iTris++] = iVertex - 1;
                    indicesTris[iTris++] = iVertex - (m + 1) - 1;
                    indicesTris[iTris++] = iVertex - (m + 1);
                }
            }
        }
	}

	return {
		createVertexData : createVertexData
	}

}());
