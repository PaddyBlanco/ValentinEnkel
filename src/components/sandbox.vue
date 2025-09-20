<template>
  <div class="html-demo">
    <h1>Text</h1>
    <h2>Text</h2>
    <h3>Text</h3>
    <h4>Text</h4>
    <h5>Text</h5>
    <h6>Text</h6>

    <p>Das ist ein Absatz mit Text.</p>
    <strong>Text (strong)</strong><br>
    <b>Text (b)</b><br>
    <em>Text (em)</em><br>
    <i>Text (i)</i><br>
    <u>Text (u)</u><br>
    <s>Text (s)</s><br>
    <mark>Text (mark)</mark><br>
    <small>Text (small)</small><br>

    <blockquote>Text (blockquote)</blockquote>
    <code>Text (code)</code><br>
    <pre>Text (pre)</pre>

    <ul>
      <li>Text (ul/li)</li>
      <li>Text</li>
    </ul>
    <ol>
      <li>Text (ol/li)</li>
      <li>Text</li>
    </ol>

    <table >
      <thead>
        <tr><th>Text (th)</th><th>Text</th></tr>
      </thead>
      <tbody>
        <tr><td>Text (td)</td><td>Text</td></tr>
      </tbody>
    </table>

    <button>Text (button)</button>
    <input type="text" placeholder="Text (input)" />
    <textarea>Text (textarea)</textarea>
    <select>
      <option>Text (option)</option>
    </select>
  </div>
</template>

<script setup>
// keine Logik nötig
</script>

<style scoped>
.html-demo {
  display: grid;
  gap: 1rem;
}
</style>
