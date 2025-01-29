/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var shapes = {
    BOX: 0,
    CONE: 1,
    CYLINDER: 2,
    SPHERE: 3,
    TRIANGLE: 4

};

var view = {
    TOP: 0,
    BOTTOM: 1,
    LEFT: 2,
    RIGHT: 3,
    FRONT: 4,
    BACK: 5,
    DEFAULT: 6,
    CUSTOM: 7
}

function Box(xWidth, yWidth, zWidth, xPos, yPos, zPos) {
    this.xWidth = xWidth;
    this.yWidth = yWidth;
    this.zWidth = zWidth;
    this.xPos = xPos;
    this.yPos = yPos;
    this.zPos = zPos;
    this.rColor = 0.0;
    this.gColor = 0.0;
    this.bColor = 1.0;
    this.positionBuffer = null;
    this.indexBuffer = null;
    this.colorBuffer = null;
    this.textureBuffer = null;
    this.textureData = null;
    this.isColorMode = true;
    this.normalsBuffer = null;

    this.setPosition = function(xWidth, yWidth, zWidth, xPos, yPos, zPos) {
        this.xWidth = xWidth;
        this.yWidth = yWidth;
        this.zWidth = zWidth;
        this.xPos = xPos;
        this.yPos = yPos;
        this.zPos = zPos;
    }
    this.getIndicesLength = function() {
        return this.getIndices().length;
    };

    this.getStride = function() {
        return this.getVertices().BYTES_PER_ELEMENT * 12;
    };
    this.getOffset = function() {
        return this.getVertices().BYTES_PER_ELEMENT * 9;
    };

    this.getPositionBuffer = function() {
        if (this.positionBuffer == null) {
            this.positionBuffer = gl.createBuffer();
        }
        return this.positionBuffer;
    };
    this.getIndexBuffer = function() {
        if (this.indexBuffer == null) {
            this.indexBuffer = gl.createBuffer();
        }
        return this.indexBuffer;
    };
    this.getColorBuffer = function() {
        if (this.colorBuffer == null) {
            this.colorBuffer = gl.createBuffer();
        }
        return this.colorBuffer;
    };
    this.getTextureBuffer = function() {
        if (this.textureBuffer == null) {
            this.textureBuffer = gl.createBuffer();
        }
        return this.textureBuffer;
    };

    this.getNormalsBuffer = function() {
        if (this.normalsBuffer == null) {
            this.normalsBuffer = gl.createBuffer();
        }
        return this.normalsBuffer;
    };

    this.getTextureData = function() {
        if (this.textureData == null) {
            this.textureData = gl.createTexture();
        }
        return this.textureData;
    };

    this.setColor = function(rColor, gColor, bColor) {
        this.rColor = rColor;
        this.gColor = gColor;
        this.bColor = bColor;
    };

    this.getColor = function() {
        var rgb = new Array([this.rColor], [this.gColor], [this.bColor]);
        return rgb;
    };

    this.getColors = function() {
        var colors = new Float32Array(72);
        for (var i = 0; i <= 71; i += 3) {
            colors[i] = this.rColor;
            colors[i + 1] = this.gColor;
            colors[i + 2] = this.bColor;
        }
        return colors;
    };

    this.getTexture = function() {
        // Create a cube
        //    v6----- v5
        //   /|      /|
        //  v1------v0|
        //  | |     | |
        //  | |v7---|-|v4
        //  |/      |/
        //  v2------v3

        var texture = new Float32Array([
            1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, // v0-v1-v2-v3 front
            0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, // v0-v3-v4-v5 right
            1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, // v0-v5-v6-v1 up
            1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, // v1-v6-v7-v2 left
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, // v7-v4-v3-v2 down
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0     // v4-v7-v6-v5 back
        ]);
        return texture;
    };

    this.getVertices = function() {
        // Create a cube
        //    v6----- v5
        //   /|      /|
        //  v1------v0|
        //  | |     | |
        //  | |v7---|-|v4
        //  |/      |/
        //  v2------v3
        var v1x = this.xPos - (this.xWidth / 2);
        var v1y = this.yPos + (this.yWidth / 2);
        var v1z = this.zPos + (this.zWidth / 2);

        var v0x = this.xPos + (this.xWidth / 2);
        var v0y = this.yPos + (this.yWidth / 2);
        var v0z = this.zPos + (this.zWidth / 2);

        var v2x = this.xPos - (this.xWidth / 2);
        var v2y = this.yPos - (this.yWidth / 2);
        var v2z = this.zPos + (this.zWidth / 2);

        var v3x = this.xPos + (this.xWidth / 2);
        var v3y = this.yPos - (this.yWidth / 2);
        var v3z = this.zPos + (this.zWidth / 2);

        var vertices = new Float32Array([// Vertex coordinates
            v0x, v0y, v0z, v1x, v1y, v1z, v2x, v2y, v2z, v3x, v3y, v3z, // v0-v1-v2-v3 front
            v0x, v0y, v0z, v3x, v3y, v3z, v3x, v3y, v3z + this.zWidth, v0x, v0y, v0z + this.zWidth, // v0-v3-v4-v5 right
            v0x, v0y, v0z, v0x, v0y, v0z + this.zWidth, v1x, v1y, v1z + this.zWidth, v1x, v1y, v1z, // v0-v5-v6-v1 up
            v1x, v1y, v1z, v1x, v1y, v1z + this.zWidth, v2x, v2y, v2z + this.zWidth, v2x, v2y, v2z, // v1-v6-v7-v2 left
            v2x, v2y, v2z + this.zWidth, v3x, v3y, v3z + this.zWidth, v3x, v3y, v3z, v2x, v2y, v2z, // v7-v4-v3-v2 down
            v3x, v3y, v3z + this.zWidth, v2x, v2y, v2z + this.zWidth, v1x, v1y, v1z + this.zWidth, v0x, v0y, v0z + this.zWidth // v4-v7-v6-v5 back
        ]);
        return vertices;
    };

    this.getIndices = function() {
        var indices = new Uint16Array([// Indices of the vertices
            0, 1, 2, 0, 2, 3, // front
            4, 5, 6, 4, 6, 7, // back
            8, 9, 10, 8, 10, 11, // top
            12, 13, 14, 12, 14, 15, // bottom
            16, 17, 18, 16, 18, 19, // right
            20, 21, 22, 20, 22, 23    // left
        ]);
        return indices;
    };

    this.getNormals = function() {
        // Normal
        var normals = new Float32Array([
            0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, // v0-v1-v2-v3 front
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, // v0-v3-v4-v5 right
            0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, // v0-v5-v6-v1 up
            -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, // v1-v6-v7-v2 left
            0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, // v7-v4-v3-v2 down
            0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0   // v4-v7-v6-v5 back
        ]);
        return normals;
    };

    this.getClass = function() {
        return shapes.BOX;
    };
}

function Triangle(xWidth, yWidth, zWidth, xPos, yPos, zPos) {
    this.xWidth = xWidth;
    this.yWidth = yWidth;
    this.zWidth = zWidth;
    this.xPos = xPos;
    this.yPos = yPos;
    this.zPos = zPos;
    this.rColor = 0.0;
    this.gColor = 0.0;
    this.bColor = 1.0;
    this.positionBuffer = null;
    this.indexBuffer = null;
    this.colorBuffer = null;
    this.textureBuffer = null;
    this.textureData = null;
    this.isColorMode = true;
    this.normalsBuffer = null;

    this.setPosition = function(xWidth, yWidth, zWidth, xPos, yPos, zPos) {
        this.xWidth = xWidth;
        this.yWidth = yWidth;
        this.zWidth = zWidth;
        this.xPos = xPos;
        this.yPos = yPos;
        this.zPos = zPos;
    }

    this.getIndicesLength = function() {
        return this.getIndices().length;
    };

    this.setColor = function(rColor, gColor, bColor) {
        this.rColor = rColor;
        this.gColor = gColor;
        this.bColor = bColor;
    };

    this.getPositionBuffer = function() {
        if (this.positionBuffer == null) {
            this.positionBuffer = gl.createBuffer();
        }
        return this.positionBuffer;
    };
    this.getIndexBuffer = function() {
        if (this.indexBuffer == null) {
            this.indexBuffer = gl.createBuffer();
        }
        return this.indexBuffer;
    };
    this.getColorBuffer = function() {
        if (this.colorBuffer == null) {
            this.colorBuffer = gl.createBuffer();
        }
        return this.colorBuffer;
    };
    this.getTextureBuffer = function() {
        if (this.textureBuffer == null) {
            this.textureBuffer = gl.createBuffer();
        }
        return this.textureBuffer;
    };

    this.getTextureData = function() {
        if (this.textureData == null) {
            this.textureData = gl.createTexture();
        }
        return this.textureData;
    };
    this.getNormalsBuffer = function() {
        if (this.normalsBuffer == null) {
            this.normalsBuffer = gl.createBuffer();
        }
        return this.normalsBuffer;
    };


    this.getColor = function() {
        var rgb = new Array([this.rColor], [this.gColor], [this.bColor]);
        return rgb;
    };

    this.getColors = function() {
        var colors = new Float32Array(12);
        for (var i = 0; i <= 11; i += 3) {
            colors[i] = this.rColor;
            colors[i + 1] = this.gColor;
            colors[i + 2] = this.bColor;
        }
        return colors;
    };

    this.getVertices = function() {
        var v0x = this.xPos;
        var v0y = this.yPos + (this.yWidth / 2);
        var v0z = this.zPos - (this.zWidth / 2);

        var v1x = this.xPos + (this.xWidth / 2);
        var v1y = this.yPos - (this.yWidth / 2);
        var v1z = this.zPos - (this.zWidth / 2);

        var v2x = this.xPos - (this.xWidth / 2);
        var v2y = this.yPos - (this.yWidth / 2);
        var v2z = this.zPos - (this.zWidth / 2);

        var v3x = this.xPos;
        var v3y = this.yPos - (this.yWidth / 2);
        var v3z = this.zPos - (this.zWidth / 2);

        var vertices = new Float32Array([// Vertex coordinates
            v0x, v0y, (v0z + (this.zWidth / 2)),
            v1x, v1y, v1z + this.zWidth,
            v2x, v2y, v2z + this.zWidth,
            v3x, v3y, v3z
        ]);

        return vertices;
    };

    this.getTexture = function() {
        var texture = new Float32Array([
            0, 0.5, 1, 1, 1, 1,
            0, 0.5, 1, 1, 0, 1,
            0, 0.5, 1, 1, 0.1,
            1, 1, 1, 1, 0, 1

        ]);
        return texture;
    };
    this.getIndices = function() {
        var indices = new Uint16Array([// Indices of the vertices
            0, 1, 2,
            0, 1, 3,
            0, 2, 3,
            1, 2, 3
        ]);
        return indices;
    };
    this.getNormals = function() {
        // Normal
        return this.getVertices();
    };
    this.getClass = function() {
        return shapes.TRIANGLE;
    };
}

function Sphere(radius, xPos, yPos, zPos) {
    var latBands = 30;
    var longBands = 30;
    this.radius = radius;
    this.latitudeBands = latBands;
    this.longitudeBands = longBands;
    this.xPos = xPos;
    this.yPos = yPos;
    this.zPos = zPos;
    this.rColor = 0.0;
    this.gColor = 0.0;
    this.bColor = 1.0;
    this.positionBuffer = null;
    this.indexBuffer = null;
    this.colorBuffer = null;
    this.textureBuffer = null;
    this.textureData = null;
    this.isColorMode = true;
    this.normalsBuffer = null;

    this.setPosition = function(radius, xPos, yPos, zPos) {
        this.radius = radius;
        this.xPos = xPos;
        this.yPos = yPos;
        this.zPos = zPos;
    }

    this.getIndicesLength = function() {
        return this.getIndices().length;
    };

    this.setColor = function(rColor, gColor, bColor) {
        this.rColor = rColor;
        this.gColor = gColor;
        this.bColor = bColor;
    };

    this.getPositionBuffer = function() {
        if (this.positionBuffer == null) {
            this.positionBuffer = gl.createBuffer();
        }
        return this.positionBuffer;
    };
    this.getIndexBuffer = function() {
        if (this.indexBuffer == null) {
            this.indexBuffer = gl.createBuffer();
        }
        return this.indexBuffer;
    };
    this.getColorBuffer = function() {
        if (this.colorBuffer == null) {
            this.colorBuffer = gl.createBuffer();
        }
        return this.colorBuffer;
    };
    this.getTextureBuffer = function() {
        if (this.textureBuffer == null) {
            this.textureBuffer = gl.createBuffer();
        }
        return this.textureBuffer;
    };
    this.getTextureData = function() {
        if (this.textureData == null) {
            this.textureData = gl.createTexture();
        }
        return this.textureData;
    };
    this.getNormalsBuffer = function() {
        if (this.normalsBuffer == null) {
            this.normalsBuffer = gl.createBuffer();
        }
        return this.normalsBuffer;
    };

    this.getColor = function() {
        var rgb = new Array([this.rColor], [this.gColor], [this.bColor]);
        return rgb;
    };

    this.getColors = function() {

        var latBands = this.latitudeBands;
        var longBands = this.longitudeBands;
        var colors = new Float32Array(3 * (latBands + 1) * (longBands + 1));
        for (var latNumber = 0; latNumber <= latBands; latNumber++) {
            for (var longNumber = 0; longNumber <= longBands; longNumber++) {
                var offset = (latNumber * ((longBands + 1) * 3)) + (longNumber * 3);
                colors[0 + offset] = this.rColor;
                colors[1 + offset] = this.gColor;
                colors[2 + offset] = this.bColor;
            }
        }
        return colors;
    };

    this.getVertices = function() {

        var latBands = this.latitudeBands;
        var longBands = this.longitudeBands;
        var vertices = new Float32Array(3 * (latBands + 1) * (longBands + 1));
        for (var latNumber = 0; latNumber <= latBands; latNumber++) {
            var theta = latNumber * Math.PI / latBands;
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);

            for (var longNumber = 0; longNumber <= longBands; longNumber++) {
                var phi = longNumber * 2 * Math.PI / longBands;
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi);
                var x = cosPhi * sinTheta;
                var y = cosTheta;
                var z = sinPhi * sinTheta;

                var offset = (latNumber * ((longBands + 1) * 3)) + (longNumber * 3);
                vertices[0 + offset] = this.xPos + (x * this.radius);
                vertices[1 + offset] = this.yPos + (y * this.radius);
                vertices[2 + offset] = this.zPos + (z * this.radius);
            }
        }
        return vertices;
    };

    this.getIndices = function() {

        var latBands = this.latitudeBands;
        var longBands = this.longitudeBands;
        var indices = new Uint16Array(6 * (latBands) * (longBands));
        for (var latNumber = 0; latNumber < latBands; latNumber++) {
            for (var longNumber = 0; longNumber < longBands; longNumber++) {
                var first = (latNumber * (longBands + 1)) + longNumber;
                var second = first + longBands + 1;
                var offset = (latNumber * (longBands * 6)) + (longNumber * 6);
                indices[0 + offset] = first;
                indices[1 + offset] = second;
                indices[2 + offset] = first + 1;

                indices[3 + offset] = second;
                indices[4 + offset] = second + 1;
                indices[5 + offset] = first + 1;
            }
        }
        return indices;
    };

    this.getTexture = function() {

        var latBands = this.latitudeBands;
        var longBands = this.longitudeBands;
        var texture = new Float32Array(3 * (latBands + 1) * (longBands + 1));
        for (var latNumber = 0; latNumber <= latBands; latNumber++) {
            var theta = latNumber * Math.PI / latBands;
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);

            for (var longNumber = 0; longNumber <= longBands; longNumber++) {
                var phi = longNumber * 2 * Math.PI / longBands;
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi);
                var x = cosPhi * sinTheta;
                var y = cosTheta;
                var z = sinPhi * sinTheta;
                var u = 1 - (longNumber / this.longitudeBands);
                var v = 1 - (latNumber / this.latitudeBands);

                var offset = (latNumber * ((longBands + 1) * 3)) + (longNumber * 3);
                texture[0 + offset] = u;
                texture[1 + offset] = v;
            }
        }
        return texture;
    };
    this.getNormals = function() {
        return this.getVertices();
    };

    this.getClass = function() {
        return shapes.SPHERE;
    };
}
// Cone : This creates a cone with radius r and height h
function Cone(r1, h, xPos, yPos, zPos) {
    this.radius1 = r1;
    this.radius2 = 0;
    this.height = h;
    this.nPhi = 100;
    this.xPos = xPos;
    this.yPos = yPos;
    this.zPos = zPos;
    this.rColor = 0.0;
    this.gColor = 0.0;
    this.bColor = 1.0;
    this.positionBuffer = null;
    this.indexBuffer = null;
    this.colorBuffer = null;
    this.textureBuffer = null;
    this.textureData = null;
    this.isColorMode = true;
    this.normalsBuffer = null;

    this.setPosition = function(r1, h, xPos, yPos, zPos) {
        this.radius1 = r1;
        this.height = h;
        this.xPos = xPos;
        this.yPos = yPos;
        this.zPos = zPos;
    }

    this.getIndicesLength = function() {
        return this.getIndices().length;
    };

    this.setColor = function(rColor, gColor, bColor) {
        this.rColor = rColor;
        this.gColor = gColor;
        this.bColor = bColor;
    };

    this.getPositionBuffer = function() {
        if (this.positionBuffer == null) {
            this.positionBuffer = gl.createBuffer();
        }
        return this.positionBuffer;
    };
    this.getIndexBuffer = function() {
        if (this.indexBuffer == null) {
            this.indexBuffer = gl.createBuffer();
        }
        return this.indexBuffer;
    };
    this.getColorBuffer = function() {
        if (this.colorBuffer == null) {
            this.colorBuffer = gl.createBuffer();
        }
        return this.colorBuffer;
    };
    this.getTextureBuffer = function() {
        if (this.textureBuffer == null) {
            this.textureBuffer = gl.createBuffer();
        }
        return this.textureBuffer;
    };
    this.getTextureData = function() {
        if (this.textureData == null) {
            this.textureData = gl.createTexture();
        }
        return this.textureData;
    };


    this.getNormalsBuffer = function() {
        if (this.normalsBuffer == null) {
            this.normalsBuffer = gl.createBuffer();
        }
        return this.normalsBuffer;
    };

    this.getColor = function() {
        var rgb = new Array([this.rColor], [this.gColor], [this.bColor]);
        return rgb;
    };

    this.getColors = function() {
        var colors = new Float32Array((3 * 2 * (this.nPhi + 1)) + 3);
        for (var i = 0; i <= this.nPhi; i++) {
            var offset = (i * 6);
            colors[0 + offset] = this.rColor;
            colors[1 + offset] = this.gColor;
            colors[2 + offset] = this.bColor;
            colors[3 + offset] = this.rColor;
            colors[4 + offset] = this.gColor;
            colors[5 + offset] = this.bColor;

        }
        //uncomment 4 Lines to have color on base
        var offset = ((this.nPhi + 1) * 6);
        colors[0 + offset] = this.rColor;
        colors[1 + offset] = this.gColor;
        colors[2 + offset] = this.bColor;
        return colors;
    };

    // return the vertices of the cone
    this.getVertices = function() {
        var vertices = new Float32Array((3 * 2 * (this.nPhi + 1)) + 3);
        var nMult = 1;//this.height;
        var Phi = 0;
        var dPhi = 2 * Math.PI / (this.nPhi);
        for (var i = 0; i <= this.nPhi; i++) {
            var cosPhi = Math.cos(Phi);
            var sinPhi = Math.sin(Phi);
            var cosPhi2 = Math.cos(Phi + dPhi / 2);
            var sinPhi2 = Math.sin(Phi + dPhi / 2);

            var offset = (i * 6);
            vertices[0 + offset] = this.xPos + ((cosPhi * this.radius1) * nMult);
            vertices[1 + offset] = this.yPos + ((-this.height / 2));
            vertices[2 + offset] = this.zPos + ((sinPhi * this.radius1) * nMult);
            vertices[3 + offset] = this.xPos + ((cosPhi2 * this.radius2) * nMult);
            vertices[4 + offset] = this.yPos + ((this.height / 2));
            vertices[5 + offset] = this.zPos + ((sinPhi2 * this.radius2) * nMult);
            Phi += dPhi;
        }
        var offset = 3 * 2 * (this.nPhi + 1);
        vertices[0 + offset] = this.xPos;
        vertices[1 + offset] = this.yPos + ((-this.height / 2));
        vertices[2 + offset] = this.zPos;

        return vertices;
    };  // getVertices

    this.getIndices = function() {
        var indices = new Uint16Array(3 * 2 * (this.nPhi + 1));
        for (var i = 0; i < this.nPhi; i++) {
            var offset = (i * 6);
            indices[0 + offset] = (i * 2);
            indices[1 + offset] = (i * 2) + 1;
            indices[2 + offset] = (i * 2) + 2;

            //bottom base
            indices[3 + offset] = (i * 2);
            indices[4 + offset] = (i * 2) + 2;
            indices[5 + offset] = 2 * (this.nPhi + 1);
        }
        return indices;
    }; // Indices

    this.getTexture = function() {

        var texture = new Float32Array(3 * 2 * (this.nPhi + 1));
        var Phi = 0;
        var dPhi = 2 * Math.PI / (this.nPhi - 1);
        for (var i = 0; i < this.nPhi; i++) {

            var u = 1 - (i / this.nPhi);
            var v = 1 - (i / this.nPhi);
            var offset = (i * 6);
            texture[0 + offset] = u;
            texture[1 + offset] = v;
            Phi += dPhi;
        }
        return texture;
    };
    this.getNormals = function() {
        return this.getVertices();
    };
    this.getClass = function() {
        return shapes.CONE;
    };

}
// Cylinder : This creates a cylinder with radius r and height h
function Cylinder(r, h, xPos, yPos, zPos) {
    this.radius = r;
    this.height = h;
    this.nPhi = 100;
    this.xPos = xPos;
    this.yPos = yPos;
    this.zPos = zPos;
    this.rColor = 0.0;
    this.gColor = 0.0;
    this.bColor = 1.0;
    this.positionBuffer = null;
    this.indexBuffer = null;
    this.colorBuffer = null;
    this.textureBuffer = null;
    this.textureData = null;
    this.isColorMode = true;
    this.normalsBuffer = null;

    this.setPosition = function(r, h, xPos, yPos, zPos) {
        this.radius = r;
        this.height = h;
        this.xPos = xPos;
        this.yPos = yPos;
        this.zPos = zPos;
    }

    this.getIndicesLength = function() {
        return this.getIndices().length;
    };

    this.setColor = function(rColor, gColor, bColor) {
        this.rColor = rColor;
        this.gColor = gColor;
        this.bColor = bColor;
    };

    this.getPositionBuffer = function() {
        if (this.positionBuffer == null) {
            this.positionBuffer = gl.createBuffer();
        }
        return this.positionBuffer;
    };
    this.getIndexBuffer = function() {
        if (this.indexBuffer == null) {
            this.indexBuffer = gl.createBuffer();
        }
        return this.indexBuffer;
    };
    this.getColorBuffer = function() {
        if (this.colorBuffer == null) {
            this.colorBuffer = gl.createBuffer();
        }
        return this.colorBuffer;
    };
    this.getTextureBuffer = function() {
        if (this.textureBuffer == null) {
            this.textureBuffer = gl.createBuffer();
        }
        return this.textureBuffer;
    };
    this.getTextureData = function() {
        if (this.textureData == null) {
            this.textureData = gl.createTexture();
        }
        return this.textureData;
    };

    this.getNormalsBuffer = function() {
        if (this.normalsBuffer == null) {
            this.normalsBuffer = gl.createBuffer();
        }
        return this.normalsBuffer;
    };
    this.getColor = function() {
        var rgb = new Array([this.rColor], [this.gColor], [this.bColor]);
        return rgb;
    };
    this.getColors = function() {
        var colors = new Float32Array((3 * 2 * (this.nPhi + 1)) + 6);
        for (var i = 0; i <= this.nPhi; i++) {
            var offset = (i * 6);
            colors[0 + offset] = this.rColor;
            colors[1 + offset] = this.gColor;
            colors[2 + offset] = this.bColor;
            colors[3 + offset] = this.rColor;
            colors[4 + offset] = this.gColor;
            colors[5 + offset] = this.bColor;
        }
        //uncomment 7 Lines to have color on bases
        var offset = ((this.nPhi + 1) * 6);
        colors[0 + offset] = this.rColor;
        colors[1 + offset] = this.gColor;
        colors[2 + offset] = this.bColor;
        colors[3 + offset] = this.rColor;
        colors[4 + offset] = this.gColor;
        colors[5 + offset] = this.bColor;

        return colors;
    };

    // return the vertices of the cylinder
    this.getVertices = function() {
        var vertices = new Float32Array((3 * 2 * (this.nPhi + 1)) + 6);
        var nMult = 1;//this.height;
        var Phi = 0;
//		var dPhi = 2*Math.PI / (this.nPhi-1);
        var dPhi = 2 * Math.PI / (this.nPhi);
        for (var i = 0; i <= this.nPhi; i++) {
            var cosPhi = Math.cos(Phi);
            var sinPhi = Math.sin(Phi);

            var offset = (i * 6);
            vertices[0 + offset] = this.xPos + ((cosPhi * this.radius) * nMult);
            vertices[1 + offset] = this.yPos + ((-this.height / 2));
            vertices[2 + offset] = this.zPos + ((sinPhi * this.radius) * nMult);
            vertices[3 + offset] = this.xPos + ((cosPhi * this.radius) * nMult);
            vertices[4 + offset] = this.yPos + ((this.height / 2));
            vertices[5 + offset] = this.zPos + ((sinPhi * this.radius) * nMult);
            Phi += dPhi;
        }
        var offset = 3 * 2 * (this.nPhi + 1);
        vertices[0 + offset] = this.xPos;
        vertices[1 + offset] = this.yPos + ((-this.height / 2));
        vertices[2 + offset] = this.zPos;
        vertices[3 + offset] = this.xPos;
        vertices[4 + offset] = this.yPos + ((this.height / 2));
        vertices[5 + offset] = this.zPos;

        return vertices;
    };  // getVertices

    this.getIndices = function() {
        var indices = new Uint16Array(6 * 2 * (this.nPhi + 1));
        for (var i = 0; i < this.nPhi; i++) {
            var offset = (i * 12);
            //bottom triangle
            indices[0 + offset] = (i * 2);
            indices[1 + offset] = (i * 2) + 1;
            indices[2 + offset] = (i * 2) + 2;

            //top triangle
            indices[3 + offset] = (i * 2) + 1;
            indices[4 + offset] = (i * 2) + 2;
            indices[5 + offset] = (i * 2) + 3;

            //bottom base
            indices[6 + offset] = (i * 2);
            indices[7 + offset] = (i * 2) + 2;
            indices[8 + offset] = 2 * (this.nPhi + 1);

            //top base
            indices[9 + offset] = (i * 2) + 1;
            indices[10 + offset] = (i * 2) + 3;
            indices[11 + offset] = (2 * (this.nPhi + 1)) + 1;

        }
        return indices;
    }; // Indices

    this.getTexture = function() {

        var texture = new Float32Array(3 * 2 * (this.nPhi + 1));
        var Phi = 0;
        var dPhi = 2 * Math.PI / (this.nPhi - 1);
        for (var i = 0; i < this.nPhi; i++) {

            var u = 1 - (i / this.nPhi);
            var v = 1 - (i / this.nPhi);
            var offset = (i * 6);
            texture[0 + offset] = u;
            texture[1 + offset] = v;
            Phi += dPhi;
        }
        return texture;
    };
    this.getNormals = function() {
        return this.getVertices();
    };

    this.getClass = function() {
        return shapes.CYLINDER;
    };

}