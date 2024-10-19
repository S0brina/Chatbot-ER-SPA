// src/controllers/csrfToken.js
export function getCSRFToken() {
    let csrfToken = null;
    const meta = document.querySelector('meta[name="csrf-token"]');
    if (meta) {
        csrfToken = meta.getAttribute('content');
    }
    return csrfToken;
}
