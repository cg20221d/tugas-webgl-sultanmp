function main() {
  var kanvas = document.getElementById('kanvas');
  var gl = kanvas.getContext('webgl');

  var vertices = [-0.75, 0.25, -0.95, 0.25, -0.95, 0.0, -0.75, 0.0, -0.75, 0.25, -0.75, 0.0, -0.75, -0.25, -0.95, -0.25];

  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  // Vertex shader
  var vertexShaderCode = `
    attribute vec2 aPosition;
      void main() {
          float x = aPosition.x;
          float y = aPosition.y;
          gl_PointSize = 10.0;
          gl_Position = vec4(x, y, 0.0, 1.0);
      }
      `;
  var vertexShaderObject = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShaderObject, vertexShaderCode);
  gl.compileShader(vertexShaderObject); // sampai sini sudah jadi .o

  // Fragment shader
  var fragmentShaderCode = `
    precision mediump float;
      void main() {
          float r = 0.0;
          float g = 0.0;
          float b = 0.0;
          gl_FragColor = vec4(r, g, b, 1.0);
      }
      `;
  var fragmentShaderObject = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShaderObject, fragmentShaderCode);
  gl.compileShader(fragmentShaderObject); // sampai sini sudah jadi .o

  var shaderProgram = gl.createProgram(); // wadah dari executable (.exe)
  gl.attachShader(shaderProgram, vertexShaderObject);
  gl.attachShader(shaderProgram, fragmentShaderObject);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  // Kita mengajari GPU bagaimana caranya mengoleksi
  // nilai posisi dari ARRAY_BUFFER
  // untuk setiap verteks yang sedang diproses

  var aPosition = gl.getAttribLocation(shaderProgram, 'aPosition');
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);

  gl.clearColor(1.0, 1.0, 1.0, 1.0); // Oranye
  //            Merah     Hijau   Biru    Transparansi
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.LINE_STRIP, 0, 8);
}
