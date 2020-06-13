<template>
  <div class="mail-container">
    <div class="top-container">

      <div class="labels">
        <span v-if="mail.labels.incoming" class="labels__item">Incoming</span>
        <span v-else class="labels__item">Outgoing</span>

        <span v-if="mail.labels.important" class="labels__item">Important</span>

        <span v-if="mail.labels.spam" class="labels__item">Spam</span>

        <span v-if="mail.labels.unread" class="labels__item">Unread</span>
      </div>

      <div class="mail-options">
        <a class="mail-options__important">
          <svg
            viewBox="0 0 434 413"
            class="mail-options__important-svg"
            xmlns="http://www.w3.org/2000/svg"
            @click="labelUpdate('important')"
          >
            <path
              d="M217 16.1803L263.434 159.089L264.556 162.544H268.189H418.452L296.887 250.867L293.948 253.002L295.071 256.457L341.504 399.366L219.939 311.043L217 308.908L214.061 311.043L92.4955 399.366L138.929 256.457L140.052 253.002L137.113 250.867L15.5475 162.544H165.811H169.444L170.566 159.089L217 16.1803Z"
              style="stroke: rgb(96, 129, 201); stroke-width: 10;"
              :class="{'mail-options__important-svg-path_selected': mail.labels.important}"
            />
          </svg>
        </a>

        <b-button class="mail-options__delete" @click="showDeleteModal" />

        <div class="mail-options__settings btn-group">
          <b-dropdown class="mail-options__settings-dropdown" variant="link" right>
            <template v-slot:button-content>
              <img class="mail-options__settings-icon" src="../assets/settings.svg">
            </template>

            <b-dropdown-item>
              <button class="dropdown-item" @click="labelUpdate('spam')">
                Spam
              </button>
            </b-dropdown-item>
            <b-dropdown-item>
              <button class="dropdown-item" @click="labelUpdate('unread')">
                Mark unread
              </button>
            </b-dropdown-item>
          </b-dropdown>
        </div>

      </div>

    </div>

    <div class="mail">

      <ul class="mail__adresses">

        <li class="mail__adresses-item">
          Sender: {{ mail.sender }}
        </li>

        <li class="mail__adresses-item">
          Receiver: {{ mail.receiver }}
        </li>

      </ul>

      <div class="mail__content">
        <h2 class="mail__content-title">
          {{ mail.subject }}
        </h2>

        <p class="mail__content-text">
          {{ mail.text }}
        </p>
      </div>

      <div v-if="mail.files" class="mail__attachments">
        <form
          v-for="(file, index) in mail.files"
          :key="file._id"
          :action="'/api/v1/file/' + mail._id + '/' + index"
          target="_blank"
        >
          <button class="myBtn_outline get-attachment-btn" type="submit">
            File #{{ +index + 1 }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script src="../javascripts/mail.js"></script>

<style lang="scss" src="../stylesheets/mail.scss" scoped></style>
