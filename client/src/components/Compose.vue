<template>
  <div>

    <form
      id="mailForm"
      class="inputForm needs-validation d-flex flex-column align-items-center"
      name="mail"
      v-on:submit="send"
      enctype="multipart/form-data"
      novalidate
    >
      <div class="form-group col-xs-8 col-md-6 mt-3">
        <label for="receiver">To:</label>
        <input
          v-model="receiver"
          class="form-control"
          type="email"
          name="receiver"
          placeholder="friend@example.com"
          required
        />
        <div class="invalid-feedback">Please, enter receiver email address!</div>
      </div>

      <div class="form-group col-xs-8 col-md-6 mt-3">
        <label for="subject">Subject:</label>
        <input class="form-control" id="subject" type="text" name="subject" />
      </div>

      <div class="form-group col-xs-8 col-md-6 mt-3">
        <label for="text">Text:</label>
        <textarea v-model="text" class="form-control" name="text" rows="10" placeholder="Enter text..."></textarea>
      </div>

      <b-form-file
          v-model="attachments"
          class="col-xs-8 col-md-6 mt-3"
          id="customFile"
          type="file"
          name="file"
          placeholder="Attach files"
          multiple
          v-bind:file-name-formatter="formatNames"
        ></b-form-file>

      <div v-show="showError" id="empty-error">
        <h2>Mail cannot be empty(text or file must be specified)</h2>
      </div>

      <input class="myBtn-outline mt-4" id="submit" type="submit" value="Submit" />
    </form>
  </div>
</template>

<script src="../javascripts/compose.js"></script>

<style src="../stylesheets/form.css" scoped></style>