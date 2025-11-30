<script>
    let email = '';
    let error = '';
    
    function validate() {
        if (!email.includes('@')) {
            error = 'Invalid email';
        } else {
            error = '';
        }
    }
</script>

<h1>Login</h1>
<p>Welcome! Please sign in to continue.</p>

<input 
    placeholder="Email" 
    bind:value={email}
    on:input={validate}
/>

<button disabled={!email}>
  Login with Google
</button>


{#if error}
    <p>{error}</p>
{/if}
