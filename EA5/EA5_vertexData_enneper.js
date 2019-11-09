var enneper = ( function() {

	function createVertexData() {
		var n = 30;
        var m = 20;
        var a = -0.25;
        var b = -0.25;
        var c = 0.1;
        var du = 4 / n;
        var dv = 4 / m;

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

        // Counter for entries in index array.
        var iLines = 0;
        var iTris = 0;

        // Loop angle u.
        for (var i = 0, u = -2; i <= n; i++ , u += du) {
            // Loop height v.
            for (var j = 0, v = -2; j <= m; j++ , v += dv) {

                var iVertex = i * (m + 1) + j;

                var y = a * (u - (((Math.pow(u,3)) / 3) + u * Math.pow(v,2)));
                var x = c * (Math.pow(u,2) - Math.pow(v,2));
                var z = b * (v - ((Math.pow(v,3) / 3) + Math.pow(u,2) * v));


                var offsetX = -1;
                var offsetY = 0;
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
