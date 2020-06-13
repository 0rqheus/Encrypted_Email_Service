<template>
  <div class="api">
    <h2 class="api__title">
      REST API v1 documentation
    </h2>

    <h3 class="api__subtitle">
      Users
    </h3>

    <details class="api-method">
      <summary class="api-method__summary">
        GET /users
      </summary>

      <p class="api-method__description">
        Returns a list of users matching the search criteria.
      </p>

      <h4 class="api-method__header">
        Authentication
      </h4>
      <p class="api-method__text">
        Admin
      </p>

      <h4 class="api-method__header">
        Params
      </h4>
      <table class="api-params-table">
        <tr>
          <td>search</td>
          <td>User fullnames and logins search string.</td>
        </tr>
        <tr>
          <td>page</td>
          <td>Number of choosen page.</td>
        </tr>
      </table>

      <h4 class="api-method__header">
        Result
      </h4>
      <p class="api-method__text">
        Returns a list of user objects.
      </p>

      <h4 class="api-method__header">
        Errors
      </h4>
      <p class="api-method__text">
        401(Not authorized), 403(User not a admin), 500.
      </p>

    </details>

    <details class="api-method">
      <summary class="api-method__summary">
        POST /users
      </summary>

      <p class="api-method__description">
        Creates user.
      </p>

      <h4 class="api-method__header">
        Authentication
      </h4>
      <p class="api-method__text">
        Admin
      </p>

      <h4 class="api-method__header">
        Params
      </h4>
      <p class="api-method__text">
        -
      </p>

      <h4 class="api-method__header">
        Result
      </h4>
      <p class="api-method__text">
        Returns a created user object.
      </p>

      <h4 class="api-method__header">
        Errors
      </h4>
      <p class="api-method__text">
        400(User already exists), 401(Not authorized), 403(User not a admin), 500.
      </p>

      <h4 class="api-method__header">
        Example
      </h4>

      <p class="api-method__text">
        Request body:
      </p>
      <code class="api-method__code">
        <pre>
    {
        "login": "username@example.com",
        "fullname": "Real Name",
        "password": "pa$$w0rd"
    }</pre>
      </code>
    </details>

    <details class="api-method">
      <summary class="api-method__summary">
        GET /users/:id
      </summary>

      <p class="api-method__description">
        Returns user by id.
      </p>

      <h4 class="api-method__header">
        Authentication
      </h4>
      <p class="api-method__text">
        Admin
      </p>

      <h4 class="api-method__header">
        Params
      </h4>
      <p class="api-method__text">
        -
      </p>

      <h4 class="api-method__header">
        Result
      </h4>
      <p class="api-method__text">
        Returns a choosen user object.
      </p>

      <h4 class="api-method__header">
        Errors
      </h4>
      <p class="api-method__text">
        401(Not authorized), 403(User not a admin), 500.
      </p>
    </details>

    <details class="api-method">
      <summary class="api-method__summary">
        PUT /users/:id
      </summary>

      <p class="api-method__description">
        Changes user by id.
      </p>

      <h4 class="api-method__header">
        Authentication
      </h4>
      <p class="api-method__text">
        Admin
      </p>

      <h4 class="api-method__header">
        Params
      </h4>
      <p class="api-method__text">
        -
      </p>

      <h4 class="api-method__header">
        Result
      </h4>
      <p class="api-method__text">
        Returns a updated user object.
      </p>

      <h4 class="api-method__header">
        Errors
      </h4>
      <p class="api-method__text">
        401(Not authorized), 403(User not a admin), 500.
      </p>

      <h4 class="api-method__header">
        Example
      </h4>
      <p class="api-method__text">
        Request body:
      </p>
      <code class="api-method__code">
        <pre>
    {
        "description": "Something about yourself",
        "avaUrl": "https://example.com/image.jpg"
    }</pre>
      </code>
    </details>

    <details class="api-method">
      <summary class="api-method__summary">
        DELETE /users/:id
      </summary>

      <p class="api-method__description">
        Removes user by id.
      </p>

      <h4 class="api-method__header">
        Authentication
      </h4>
      <p class="api-method__text">
        Admin
      </p>

      <h4 class="api-method__header">
        Params
      </h4>
      <p class="api-method__text">
        -
      </p>

      <h4 class="api-method__header">
        Result
      </h4>
      <p class="api-method__text">
        Returns(redirect to) a list of user objects.
      </p>

      <h4 class="api-method__header">
        Errors
      </h4>
      <p class="api-method__text">
        401(Not authorized), 403(User not a admin), 500.
      </p>
    </details>

    <h3 class="api__subtitle">
      Mails
    </h3>

    <details class="api-method">
      <summary class="api-method__summary">
        GET /mails
      </summary>
      <p class="api-method__description">
        Returns a list of mails matching the search criteria.
      </p>

      <h4 class="api-method__header">
        Authentication
      </h4>
      <p class="api-method__text">
        User
      </p>

      <h4 class="api-method__header">
        Params
      </h4>
      <table class="api-params-table">
        <tr>
          <td>search</td>
          <td>Email subjects search string.</td>
        </tr>
        <tr>
          <td>page</td>
          <td>Number of choosen page.</td>
        </tr>
      </table>

      <h4 class="api-method__header">
        Result
      </h4>
      <p class="api-method__text">
        Returns a list of mail objects.
      </p>

      <h4 class="api-method__header">
        Errors
      </h4>
      <p class="api-method__text">
        401(Not authorized), 500.
      </p>
    </details>

    <details class="api-method">
      <summary class="api-method__summary">
        POST /mails
      </summary>

      <p class="api-method__description">
        Creates mail.
      </p>

      <h4 class="api-method__header">
        Authentication
      </h4>
      <p class="api-method__text">
        User
      </p>

      <h4 class="api-method__header">
        Params
      </h4>
      <p class="api-method__text">
        -
      </p>

      <h4 class="api-method__header">
        Result
      </h4>
      <p class="api-method__text">
        Returns a created mail object
      </p>

      <h4 class="api-method__header">
        Errors
      </h4>
      <p class="api-method__text">
        401(Not authorized), 500.
      </p>

      <h4 class="api-method__header">
        Example
      </h4>
      <p class="api-method__text">
        Request body:
      </p>
      <code class="api-method__code">
        <pre>
    {
        "sender": "me@example.com",
        "receiver": "u@example.com",
        "subject": "Some theme",
        "text": "Some text..."
    }</pre>
      </code>
    </details>

    <details class="api-method">
      <summary class="api-method__summary">
        GET /mails/:id
      </summary>

      <p class="api-method__description">
        Returns mails by id.
      </p>

      <h4 class="api-method__header">
        Authentication
      </h4>
      <p class="api-method__text">
        Admin
      </p>

      <h4 class="api-method__header">
        Params
      </h4>
      <p class="api-method__text">
        -
      </p>

      <h4 class="api-method__header">
        Result
      </h4>
      <p class="api-method__text">
        Returns a choosen mail object.
      </p>

      <h4 class="api-method__header">
        Errors
      </h4>
      <p class="api-method__text">
        401(Not authorized), 500.
      </p>
    </details>

    <details class="api-method">
      <summary class="api-method__summary">
        PUT /mails/:id
      </summary>

      <p class="api-method__description">
        Changes mails by id.
      </p>

      <h4 class="api-method__header">
        Authentication
      </h4>
      <p class="api-method__text">
        Admin
      </p>

      <h4 class="api-method__header">
        Params
      </h4>
      <p class="api-method__text">
        -
      </p>

      <h4 class="api-method__header">
        Result
      </h4>
      <p class="api-method__text">
        Returns a updated mail object.
      </p>

      <h4 class="api-method__header">
        Errors
      </h4>
      <p class="api-method__text">
        401(Not authorized), 500.
      </p>

      <h4 class="api-method__header">
        Example
      </h4>
      <p class="api-method__text">
        Request body:
      </p>
      <code class="api-method__code">
        <pre>
    {
        "subject": "Some changed theme",
        "text": "Some changed text..."
    }</pre>
      </code>
    </details>

    <details class="api-method">
      <summary class="api-method__summary">
        DELETE /mails/:id
      </summary>

      <p class="api-method__description">
        Removes mails by id.
      </p>

      <h4 class="api-method__header">
        Authentication
      </h4>
      <p class="api-method__text">
        Admin
      </p>

      <h4 class="api-method__header">
        Params
      </h4>
      <p class="api-method__text">
        -
      </p>

      <h4 class="api-method__header">
        Result
      </h4>
      <p class="api-method__text">
        Returns(redirect to) a list of mail objects.
      </p>

      <h4 class="api-method__header">
        Errors
      </h4>
      <p class="api-method__text">
        401(Not authorized), 500.
      </p>
    </details>

    <h3 class="api__subtitle">
      Chats
    </h3>

    <details class="api-method">
      <summary class="api-method__summary">
        GET /chats
      </summary>

      <p class="api-method__description">
        Returns a list of chats matching the search criteria.
      </p>

      <h4 class="api-method__header">
        Authentication
      </h4>
      <p class="api-method__text">
        User
      </p>

      <h4 class="api-method__header">
        Params
      </h4>
      <table class="api-params-table">
        <tr>
          <td>search</td>
          <td>Chat members names search string .</td>
        </tr>
        <tr>
          <td>page</td>
          <td>Number of choosen page.</td>
        </tr>
      </table>

      <h4 class="api-method__header">
        Result
      </h4>
      <p class="api-method__text">
        Returns a list of chat objects.
      </p>

      <h4 class="api-method__header">
        Errors
      </h4>
      <p class="api-method__text">
        401(Not authorized), 500.
      </p>
    </details>

    <details class="api-method">
      <summary class="api-method__summary">
        POST /chats
      </summary>

      <p class="api-method__description">
        Creates chat.
      </p>

      <h4 class="api-method__header">
        Authentication
      </h4>
      <p class="api-method__text">
        User
      </p>

      <h4 class="api-method__header">
        Params
      </h4>
      <p class="api-method__text">
        -
      </p>

      <h4 class="api-method__header">
        Result
      </h4>
      <p class="api-method__text">
        Returns a created chat object
      </p>

      <h4 class="api-method__header">
        Errors
      </h4>
      <p class="api-method__text">
        401(Not authorized), 500.
      </p>

      <h4 class="api-method__header">
        Example
      </h4>
      <p class="api-method__text">
        Request body:
      </p>
      <code class="api-method__code">
        <pre>
    {
        "messages": [
            "Message1ID",
            "Message2ID",
            "Message3ID"
        ],
        "person1": "me@example.com",
        "person2": "u@example.com"
    }</pre>
      </code>
    </details>

    <details class="api-method">
      <summary class="api-method__summary">
        GET /chats/:id
      </summary>

      <p class="api-method__description">
        Returns the list of mails from chat by id matching the search criteria.
      </p>

      <h4 class="api-method__header">
        Authentication
      </h4>
      <p class="api-method__text">
        Admin
      </p>

      <h4 class="api-method__header">
        Params
      </h4>
      <table class="api-params-table">
        <tr>
          <td>search</td>
          <td>Email subjects search string.</td>
        </tr>
        <tr>
          <td>page</td>
          <td>Number of choosen page.</td>
        </tr>
      </table>

      <h4 class="api-method__header">
        Result
      </h4>
      <p class="api-method__text">
        Returns a choosen chat object.
      </p>

      <h4 class="api-method__header">
        Errors
      </h4>
      <p class="api-method__text">
        401(Not authorized), 500.
      </p>
    </details>

    <details class="api-method">
      <summary class="api-method__summary">
        PUT /chats/:id
      </summary>

      <p class="api-method__description">
        Changes chat.
      </p>

      <h4 class="api-method__header">
        Authentication
      </h4>
      <p class="api-method__text">
        Admin
      </p>

      <h4 class="api-method__header">
        Params
      </h4>
      <p class="api-method__text">
        -
      </p>

      <h4 class="api-method__header">
        Result
      </h4>
      <p class="api-method__text">
        Returns a updated chat object.
      </p>

      <h4 class="api-method__header">
        Errors
      </h4>
      <p class="api-method__text">
        401(Not authorized), 500.
      </p>

      <h4 class="api-method__header">
        Example
      </h4>
      <p class="api-method__text">
        Request body:
      </p>
      <code class="api-method__code">
        <pre>
    {
        "messages": [
            "NewMessage1ID",
            "NewMessage2ID"
        ]
    }</pre>
      </code>
    </details>

    <details class="api-method">
      <summary class="api-method__summary">
        DELETE /chats/:id
      </summary>

      <p class="api-method__description">
        Removes chat and all its messages.
      </p>

      <h4 class="api-method__header">
        Authentication
      </h4>
      <p class="api-method__text">
        Admin
      </p>

      <h4 class="api-method__header">
        Params
      </h4>
      <p class="api-method__text">
        -
      </p>

      <h4 class="api-method__header">
        Result
      </h4>
      <p class="api-method__text">
        Returns(redirect to) a list of chat objects.
      </p>

      <h4 class="api-method__header">
        Errors
      </h4>
      <p class="api-method__text">
        401(Not authorized), 500.
      </p>
    </details>

    <h3 class="api__subtitle">
      Account
    </h3>

    <details class="api-method">
      <summary class="api-method__summary">
        GET /me
      </summary>

      <p class="api-method__description">
        Returns current user.
      </p>

      <h4 class="api-method__header">
        Authentication
      </h4>
      <p class="api-method__text">
        User
      </p>

      <h4 class="api-method__header">
        Params
      </h4>
      <p class="api-method__text">
        -
      </p>

      <h4 class="api-method__header">
        Result
      </h4>
      <p class="api-method__text">
        Returns a authorized user object.
      </p>

      <h4 class="api-method__header">
        Errors
      </h4>
      <p class="api-method__text">
        401(Not authorized), 500.
      </p>
    </details>
  </div>
</template>

<script>
export default {
    name: "Developer"
};
</script>

<style lang="scss" src="../stylesheets/developer.scss" scoped></style>