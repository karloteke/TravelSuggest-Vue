import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useLoginStore = defineStore('login', () => {
    const token = ref<string | null>(localStorage.getItem('token') ?? null);
    const role = ref<string | null>(localStorage.getItem('role') ?? null);
    const userId = ref<number | null>(parseInt(localStorage.getItem('userId') ?? '0', 10));
    const errorMessage = ref<string>(''); 
    const router = useRouter();

    async function login(credentials: { userName: string; password: string }) {
        try {
            const response = await fetch('https://localhost:7193/Auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Respuesta del login:', data);

                if (!data.token) {
                    throw new Error('Token no proporcionado en la respuesta');
                }

                token.value = data.token;

                // Decodificar el token JWT para obtener el rol y userId
                const decodedToken = parseJwt(data.token);
                console.log('Token decodificado:', decodedToken);

                // Ajusta estos nombres según tus claims
                const userRole = decodedToken.role || decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                const userIdClaim = decodedToken.userId || decodedToken['nameid'] || decodedToken['sub'];
                const fetchedUserId = parseInt(userIdClaim, 10);

                if (!userRole || isNaN(fetchedUserId)) {
                    throw new Error('Claims de rol o userId faltantes o inválidos en el token');
                }

                role.value = userRole;
                userId.value = fetchedUserId;

                localStorage.setItem('token', data.token);
                localStorage.setItem('role', userRole);
                localStorage.setItem('userId', fetchedUserId.toString());

                router.push('/destinations'); 
            } else {
                const errorText = await response.text();
                errorMessage.value = 'Credenciales incorrectas. Inténtalo de nuevo.'; 
                console.error('Error de inicio de sesión:', response.statusText, errorText);
                throw new Error(response.statusText); // Lanzar un error para capturar en la vista
            }
        } catch (error) {
            errorMessage.value = 'Error de inicio de sesión. Por favor, inténtalo de nuevo más tarde.';
            console.error('Error de inicio de sesión:', error);
            throw error;
        }
    }

    function logout() {
        token.value = null;
        role.value = null;
        userId.value = null;
        localStorage.removeItem('token'); 
        localStorage.removeItem('role');
        localStorage.removeItem('username'); 
        localStorage.removeItem('password'); 
        localStorage.removeItem('userId'); 
        router.push('/login');
    }

    function getToken() {
        return token.value;
    }

    function getRole(){
        return role.value;
    }

    function getUserId(){
        return userId.value;
    }

    function isLoggedIn() {
        return !!token.value; // Devuelve true si hay un token almacenado, false si no lo hay
    }

    // Función para decodificar token JWT
    function parseJwt(token: string) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Error al decodificar el token JWT:', error);
            throw error;
        }
    }

    return {
        token,
        role,
        userId,
        login,
        logout,
        getToken,
        getRole,
        getUserId,
        errorMessage, 
        isLoggedIn
    };
});
