<template>
 <Section_home_welcome/>
  <div class="html-demo">
    <h1>Übersicht HTML-Tags + Formularelemente</h1>

    <h1>Überschrift h1</h1>
    <h2>Überschrift h2</h2>
    <h3>Überschrift h3</h3>
    <h4>Überschrift h4</h4>
    <h5>Überschrift h5</h5>
    <h6>Überschrift h6</h6>


    <p>Hier ist ein Normaler Text der bisl länger ist und cooler formatier <br> ich möchte auch mehere Zeilen ausprobieren</p>
    <strong>Fett strong</strong><br>
    <b>Fett b</b><br>
    <em>Kursiv em</em><br>
    <i>Kursiv i</i><br>
    <u>Unterstrichen u</u><br>
    <s>Durchgestrichen s</s><br>
    <mark>Markiert mark</mark><br>
    <small>Kleiner small</small><br>

    <blockquote>Zitat blockquote</blockquote>
    <code>Code code</code><br>
    <pre>Vorformatierter Text pre</pre>


    <ul>
      <li>Liste ul/li – Eintrag 1</li>
      <li>Liste ul/li – Eintrag 2</li>
    </ul>
    <ol>
      <li>Liste ol/li – Eintrag 1</li>
      <li>Liste ol/li – Eintrag 2</li>
    </ol>

    <table >
      <thead>
        <tr><th>Tabellenkopf th</th><th>Tabellenkopf th</th></tr>
      </thead>
      <tbody>
        <tr><td>Tabellenzelle td</td><td>Tabellenzelle td</td></tr>
      </tbody>
    </table>

    <!-- Formular -->
    <h2>Formular mit allen Input-Typen</h2>
    <form class="form-demo">
      <label>Text: <input type="text" placeholder="input[type=text]" /></label>
      <label>Password: <input type="password" placeholder="input[type=password]" /></label>
      <label>Email: <input type="email" placeholder="input[type=email]" /></label>
      <label>Number: <input type="number" value="42" /></label>
      <label>Tel: <input type="tel" placeholder="0123456789" /></label>
      <label>URL: <input type="url" placeholder="https://..." /></label>
      <label>Search: <input type="search" placeholder="Suchbegriff" /></label>
      <label>Date: <input type="date" /></label>
      <label>Time: <input type="time" /></label>
      <label>Datetime-local: <input type="datetime-local" /></label>
      <label>Month: <input type="month" /></label>
      <label>Week: <input type="week" /></label>
      <label>Color: <input type="color" /></label>
      <label>Range: <input type="range" /></label>
      <label>Checkbox: <input type="checkbox" /></label>
      <label>Radio: <input type="radio" name="demo" /></label>
      <label>File: <input type="file" /></label>
      <label>Hidden: <input type="hidden" value="versteckt" /></label>
      <label>Reset: <input type="reset" value="Zurücksetzen" /></label>
      <label>Submit: <input type="submit" value="Absenden" /></label>
      <label>Button: <input type="button" value="Button" /></label>
      <br>
      <button>Button-Tag</button>
      <textarea placeholder="Textarea"></textarea>
      <select>
        <option>Option 1</option>
        <option>Option 2</option>
      </select>
    </form>
  </div>
</template>

<script  setup lang="ts">
import Section_home_welcome from '../components/section-home/section_home_welcome.vue';


</script>

<style scoped>
.html-demo {
  display: grid;
  gap: 0.5rem;
}

.form-demo {
  display: grid;
  gap: 0.75rem;
  max-width: 400px;
}
.form-demo label {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
}
</style>
