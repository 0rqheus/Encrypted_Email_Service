<template>
  <div>
    <form
      class="custom-form needs-validation d-flex flex-column align-items-center"
      name="mail"
      enctype="multipart/form-data"
      novalidate
      @submit="send"
    >
      <div class="form-group col-xs-8 col-md-6 mt-3">
        <label class="custom-form__label" for="receiver">To:</label>
        <input
          v-model="receiver"
          class="form-control custom-form__input"
          type="email"
          name="receiver"
          placeholder="friend@example.com"
          required
        >
        <div class="invalid-feedback">
          Please, enter receiver email address!
        </div>
      </div>

      <div class="form-group col-xs-8 col-md-6 mt-3">
        <label class="custom-form__label" for="subject">Subject:</label>
        <input
          id="subject"
          class="form-control custom-form__input"
          type="text"
          name="subject"
        >
      </div>

      <div class="form-group col-xs-8 col-md-6 mt-3">
        <label class="custom-form__label" for="text">Text:</label>
        <textarea
          v-model="text"
          class="form-control custom-form__input"
          name="text"
          rows="10"
          placeholder="Enter text..."
        />
      </div>

      <b-form-file
        id="customFile"
        v-model="attachments"
        class="col-xs-8 col-md-6 mt-3"
        type="file"
        name="file"
        placeholder="Attach files"
        multiple
        :file-name-formatter="formatNames"
      />

      <div
        v-show="showError"
        class="custom-form__error"
      >
        <p class="custom-form__text">
          Mail cannot be empty(text or file must be specified)
        </p>
      </div>

      <button class="myBtn_outline custom-form__submit mt-4" type="submit">
        Submit
      </button>
      
    </form>
  </div>
</template>

<script src="../javascripts/compose.js"></script>

<style lang="scss" src="../stylesheets/form.scss" scoped></style>