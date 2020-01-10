<template>
  <div id="api-doc">
    <h1>REST API v1 documentation</h1>

    <h2>Users</h2>

    <details class="api-req-desc">
      <summary>GET /users</summary>

      <p class="description">Returns a list of users matching the search criteria.</p>

      <h3>Authentication</h3>
      <p>Admin</p>

      <h3>Params</h3>
      <table>
        <tr>
          <td>search</td>
          <td>User fullnames and logins search string.</td>
        </tr>
        <tr>
          <td>page</td>
          <td>Number of choosen page.</td>
        </tr>
      </table>

      <h3>Result</h3>
      <p>Returns a list of user objects.</p>

      <h3>Errors</h3>
      <p>401(Not authorized), 403(User not a admin), 500.</p>
    </details>

    <details class="api-req-desc">
      <summary>POST /users</summary>

      <p class="description">Creates user.</p>

      <h3>Authentication</h3>
      <p>Admin</p>

      <h3>Params</h3>
      <p>-</p>

      <h3>Result</h3>
      <p>Returns a created user object.</p>

      <h3>Errors</h3>
      <p>400(User already exists), 401(Not authorized), 403(User not a admin), 500.</p>

      <h3>Example</h3>

      <p>Request body:</p>
      <code>
        <pre>
    {
        "login": "username@example.com",
        "fullname": "Real Name",
        "password": "pa$$w0rd"
    }
        </pre>
      </code>
    </details>

    <details class="api-req-desc">
      <summary>GET /users/:id</summary>

      <p class="description">Returns user by id.</p>

      <h3>Authentication</h3>
      <p>Admin</p>

      <h3>Params</h3>
      <p>-</p>

      <h3>Result</h3>
      <p>Returns a choosen user object.</p>

      <h3>Errors</h3>
      <p>401(Not authorized), 403(User not a admin), 500.</p>
    </details>

    <details class="api-req-desc">
      <summary>PUT /users/:id</summary>

      <p class="description">Changes user by id.</p>

      <h3>Authentication</h3>
      <p>Admin</p>

      <h3>Params</h3>
      <p>-</p>

      <h3>Result</h3>
      <p>Returns a updated user object.</p>

      <h3>Errors</h3>
      <p>401(Not authorized), 403(User not a admin), 500.</p>

      <h3>Example</h3>
      <p>Request body:</p>
      <code>
        <pre>
    {
        "description": "Something about yourself",
        "avaUrl": "https://example.com/image.jpg"
    }
            </pre>
      </code>
    </details>

    <details class="api-req-desc">
      <summary>DELETE /users/:id</summary>

      <p class="description">Removes user by id.</p>

      <h3>Authentication</h3>
      <p>Admin</p>

      <h3>Params</h3>
      <p>-</p>

      <h3>Result</h3>
      <p>Returns(redirect to) a list of user objects.</p>

      <h3>Errors</h3>
      <p>401(Not authorized), 403(User not a admin), 500.</p>
    </details>

    <h2>Mails</h2>

    <details class="api-req-desc">
      <summary>GET /mails</summary>
      <p class="description">Returns a list of mails matching the search criteria.</p>

      <h3>Authentication</h3>
      <p>User</p>

      <h3>Params</h3>
      <table>
        <tr>
          <td>search</td>
          <td>Email subjects search string.</td>
        </tr>
        <tr>
          <td>page</td>
          <td>Number of choosen page.</td>
        </tr>
      </table>

      <h3>Result</h3>
      <p>Returns a list of mail objects.</p>

      <h3>Errors</h3>
      <p>401(Not authorized), 500.</p>
    </details>

    <details class="api-req-desc">
      <summary>POST /mails</summary>

      <p class="description">Creates mail.</p>

      <h3>Authentication</h3>
      <p>User</p>

      <h3>Params</h3>
      <p>-</p>

      <h3>Result</h3>
      <p>Returns a created mail object</p>

      <h3>Errors</h3>
      <p>401(Not authorized), 500.</p>

      <h3>Example</h3>
      <p>Request body:</p>
      <code>
        <pre>
    {
        "sender": "me@example.com",
        "receiver": "u@example.com",
        "subject": "Some theme",
        "text": "Some text..."
    }
            </pre>
      </code>
    </details>

    <details class="api-req-desc">
      <summary>GET /mails/:id</summary>

      <p class="description">Returns mails by id.</p>

      <h3>Authentication</h3>
      <p>Admin</p>

      <h3>Params</h3>
      <p>-</p>

      <h3>Result</h3>
      <p>Returns a choosen mail object.</p>

      <h3>Errors</h3>
      <p>401(Not authorized), 500.</p>
    </details>

    <details class="api-req-desc">
      <summary>PUT /mails/:id</summary>

      <p class="description">Changes mails by id.</p>

      <h3>Authentication</h3>
      <p>Admin</p>

      <h3>Params</h3>
      <p>-</p>

      <h3>Result</h3>
      <p>Returns a updated mail object.</p>

      <h3>Errors</h3>
      <p>401(Not authorized), 500.</p>

      <h3>Example</h3>
      <p>Request body:</p>
      <code>
        <pre>
    {
        "subject": "Some changed theme",
        "text": "Some changed text..."
    }
            </pre>
      </code>
    </details>

    <details class="api-req-desc">
      <summary>DELETE /mails/:id</summary>

      <p class="description">Removes mails by id.</p>

      <h3>Authentication</h3>
      <p>Admin</p>

      <h3>Params</h3>
      <p>-</p>

      <h3>Result</h3>
      <p>Returns(redirect to) a list of mail objects.</p>

      <h3>Errors</h3>
      <p>401(Not authorized), 500.</p>
    </details>

    <h2>Chats</h2>

    <details class="api-req-desc">
      <summary>GET /chats</summary>

      <p class="description">Returns a list of chats matching the search criteria.</p>

      <h3>Authentication</h3>
      <p>User</p>

      <h3>Params</h3>
      <table>
        <tr>
          <td>search</td>
          <td>Chat members names search string .</td>
        </tr>
        <tr>
          <td>page</td>
          <td>Number of choosen page.</td>
        </tr>
      </table>

      <h3>Result</h3>
      <p>Returns a list of chat objects.</p>

      <h3>Errors</h3>
      <p>401(Not authorized), 500.</p>
    </details>

    <details class="api-req-desc">
      <summary>POST /chats</summary>

      <p class="description">Creates chat.</p>

      <h3>Authentication</h3>
      <p>User</p>

      <h3>Params</h3>
      <p>-</p>

      <h3>Result</h3>
      <p>Returns a created chat object</p>

      <h3>Errors</h3>
      <p>401(Not authorized), 500.</p>

      <h3>Example</h3>
      <p>Request body:</p>
      <code>
        <pre>
    {
        "messages": [
            "Message1ID",
            "Message2ID",
            "Message3ID"
        ],
        "person1": "me@example.com",
        "person2": "u@example.com"
    }
            </pre>
      </code>
    </details>

    <details class="api-req-desc">
      <summary>GET /chats/:id</summary>

      <p class="description">Returns the list of mails from chat by id matching the search criteria.</p>

      <h3>Authentication</h3>
      <p>Admin</p>

      <h3>Params</h3>
      <table>
        <tr>
          <td>search</td>
          <td>Email subjects search string.</td>
        </tr>
        <tr>
          <td>page</td>
          <td>Number of choosen page.</td>
        </tr>
      </table>

      <h3>Result</h3>
      <p>Returns a choosen chat object.</p>

      <h3>Errors</h3>
      <p>401(Not authorized), 500.</p>
    </details>

    <details class="api-req-desc">
      <summary>PUT /chats/:id</summary>

      <p class="description">Changes chat.</p>

      <h3>Authentication</h3>
      <p>Admin</p>

      <h3>Params</h3>
      <p>-</p>

      <h3>Result</h3>
      <p>Returns a updated chat object.</p>

      <h3>Errors</h3>
      <p>401(Not authorized), 500.</p>

      <h3>Example</h3>
      <p>Request body:</p>
      <code>
        <pre>
    {
        "messages": [
            "NewMessage1ID",
            "NewMessage2ID"
        ]
    }
            </pre>
      </code>
    </details>

    <details class="api-req-desc">
      <summary>DELETE /chats/:id</summary>

      <p class="description">Removes chat and all its messages.</p>

      <h3>Authentication</h3>
      <p>Admin</p>

      <h3>Params</h3>
      <p>-</p>

      <h3>Result</h3>
      <p>Returns(redirect to) a list of chat objects.</p>

      <h3>Errors</h3>
      <p>401(Not authorized), 500.</p>
    </details>

    <h2>Account</h2>

    <details class="api-req-desc">
      <summary>GET /me</summary>

      <p class="description">Returns current user.</p>

      <h3>Authentication</h3>
      <p>User</p>

      <h3>Params</h3>
      <p>-</p>

      <h3>Result</h3>
      <p>Returns a authorized user object.</p>

      <h3>Errors</h3>
      <p>401(Not authorized), 500.</p>
    </details>
  </div>
</template>

<script>
export default {
    name: "Developer"
};
</script>

<style src="../stylesheets/developer.css" scoped></style>