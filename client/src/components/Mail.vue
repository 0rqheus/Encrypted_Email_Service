<template>
  <div id="mail-body">
    <div id="labels-container">
      <span v-if="mail.labels.incoming" id="incoming-lbl" class="label">Incoming</span>
      <span v-else id="ougoing-lbl" class="label">Outgoing</span>
      <span v-if="mail.labels.important" id="important-lbl" class="label">Important</span>
      <span v-if="mail.labels.spam" id="spam-lbl" class="label">Spam</span>
      <span v-if="mail.labels.unread" id="spam-lbl" class="label">Unread</span>
    </div>

    <div id="options-container"> 
      <button id="important-btn">
        <svg
          v-on:click="labelUpdate('important')"
          viewBox="0 0 434 413"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="important-sign"
            d="M217 16.1803L263.434 159.089L264.556 162.544H268.189H418.452L296.887 250.867L293.948 253.002L295.071 256.457L341.504 399.366L219.939 311.043L217 308.908L214.061 311.043L92.4955 399.366L138.929 256.457L140.052 253.002L137.113 250.867L15.5475 162.544H165.811H169.444L170.566 159.089L217 16.1803Z"
            style="stroke: rgb(96, 129, 201); stroke-width: 10;"
            v-bind:class="{important: mail.labels.important}"
          />
        </svg>
      </button>

      <b-button id="delete-btn" type="button" v-on:click="showDeleteModal"></b-button>

      <div id="mail-setting" class="btn-group">
        <b-dropdown right id="settings-dropdown" variant="link">
          <template v-slot:button-content>
            <button id="settings-btn" type="button">
              <img id="settings-icon" src="../assets/settings.svg"/>
            </button>
          </template>
          <b-dropdown-item>
            <button v-on:click="labelUpdate('spam')" id="spam-btn" class="dropdown-item">Spam</button>
          </b-dropdown-item>
          <b-dropdown-item>
            <button v-on:click="labelUpdate('unread')" id="unread-btn" class="dropdown-item">Mark unread</button>
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>

    <div class="mail">
      <ul class="mail-adresses">
        <li>Sender: {{mail.sender}}</li>
        <li>Receiver: {{mail.receiver}}</li>
      </ul>

      <div class="mail-text">
        <h2>{{mail.subject}}</h2>

        <p id="text">{{mail.text}}</p>
      </div>

      <div
        v-if="mail.files"
        id="attachments"
      >
        <form
          v-for="(file, index) in mail.files"
          v-bind:key="file._id"
          class="get-attachment"
          v-bind:action="'/api/v1/file/' + mail._id + '/' + index"
          target="_blank"
        >
          <button
            class="myBtn-outline"
            type="submit"
          >File #{{+index + 1}}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script src="../javascripts/mail.js"></script>

<style src="../stylesheets/mail.css" scoped></style>
