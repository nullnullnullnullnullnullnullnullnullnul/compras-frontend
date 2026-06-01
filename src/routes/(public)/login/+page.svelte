<script lang="ts">
  import { PUBLIC_API_URL } from '$env/static/public';
  import { page }           from '$app/stores';

  function buildOAuthUrl(provider: 'google' | 'facebook'): string {
    const callbackUrl  = `${window.location.origin}/auth/callback`;
    const redirectParam = $page.url.searchParams.get('redirect') ?? '/productos';
    const callbackWithRedirect = `${callbackUrl}?redirect=${encodeURIComponent(redirectParam)}`;
    return `${PUBLIC_API_URL}/api/v1/auth/${provider}?redirect_uri=${encodeURIComponent(callbackWithRedirect)}`;
  }

  // eslint-disable-next-line no-unused-vars
function loginWithGoogle():   void { window.location.href = buildOAuthUrl('google');   }
// eslint-disable-next-line no-unused-vars
function loginWithFacebook(): void { window.location.href = buildOAuthUrl('facebook'); }
</script>