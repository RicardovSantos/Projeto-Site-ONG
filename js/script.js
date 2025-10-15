
document.addEventListener('DOMContentLoaded', function() {

        // ---  PLAYER DE ÁUDIO INTELIGENTE ---
        const allAudios = document.querySelectorAll('audio');
    
        allAudios.forEach(audio => {
            audio.addEventListener('play', () => {
                // Quando um áudio começa a tocar...
                allAudios.forEach(otherAudio => {
                    // ...pausa todos os outros áudios
                    if (otherAudio !== audio) {
                        otherAudio.pause();
                    }
                });
            });
        });
    
    });
