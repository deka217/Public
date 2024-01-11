function checkMicrophonePermission() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
                console.log('Microphone permission granted.');
            })
            .catch(function (err) {
                console.error('Error accessing microphone:', err);

                // You can display a message or take any other action to inform the user about the lack of microphone access.
                alert('Microphone permission is required to use this feature. Please allow microphone access and refresh the page.');
            });
    }

            function checkMicrophonePermission() {
                navigator.mediaDevices.getUserMedia({ audio: true })
                    .then(function (stream) {
                        console.log('Microphone permission granted.');
                    })
                    .catch(function (err) {
                        console.error('Error accessing microphone:', err);
                        // You can display a message or take any other action to inform the user about the lack of microphone access.
                        alert('Microphone permission is required to use this feature. Please allow microphone access and refresh the page.');
                    });
            }

           // Fungsi untuk memulai speech recognition
function startMobileSpeechRecognition(event) {
    const recognition = new webkitSpeechRecognition() || SpeechRecognition();
    recognition.lang = 'id-ID'; // Bahasa Indonesia
    recognition.interimResults = false; // Set interim results to false
    recognition.continuous = true; // Increase the continuous value

    // Set max alternatives to control the number of alternative hypotheses
    recognition.maxAlternatives = 1;

    // Ketika speech recognition selesai
    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('wisdom').value = transcript;
    };

    // Munculkan pesan jika terjadi error
    recognition.onerror = function (event) {
        console.error('Speech recognition error:', event.error);
    };

    // Ketika tombol diklik
    const startButtonMobile = document.getElementById('start_button_mobile');
    const startImgMobile = document.getElementById('start_img_mobile');

    if (startButtonMobile.dataset.active === 'true') {
        // Jika sedang aktif, hentikan speech recognition
        recognition.stop();
        startImgMobile.src = './images/mic.gif';
        startButtonMobile.dataset.active = 'false';
    } else {
        // Jika tidak aktif, mulai speech recognition
        recognition.start();
        startImgMobile.src = './images/mic-anim.gif';
        startButtonMobile.dataset.active = 'true';
    }
}

 
            /*   chrome STT start */
            var infoBox; // label
            var tempBox; // The Process of Speech Recognition
            var startStopButton; // StartStopButton
            var isSpeechRecognitionActive = false;
            // var final_transcript = ''; // Speech recognition final result
            var recognizing = false;

            function startButton(event) {
                infoBox = document.getElementById("infoBox");
                tempBox = document.getElementById("wisdom");
                langCombo = document.getElementById("langCombo");

                if (recognizing) {
                    recognition.stop();
                } else {
                    tempBox.value = '';
                    // final_transcript = ''; 
                    recognition.lang = langCombo.value;
                    recognition.start();
                }
            }

            if (!('webkitSpeechRecognition' in window)) { //If the attribute window.webkitSpeechRecognition cannot be found, it means that speech recognition is not supported and the user is required to update the browser.
                infoBox.innerText = "This browser does not support speech recognition, please change your browser! (Speech recognition is only supported in Chrome version 25+)";
            } else {
                var recognition = new webkitSpeechRecognition(); // Create a speech recognition object webkitSpeechRecognition
                recognition.continuous = true; // Set continuous identification mode
                recognition.interimResults = true; // Set the result first in the output.

                recognition.onstart = function () {
                    recognizing = true;
                    infoBox.innerText = "identifying...";
                    start_img.src = './images/mic-anim.gif';
                };

                recognition.onend = function () {
                    recognizing = false;
                    start_img.src = './images/mic.gif';
                    infoBox.innerText = "";
                    requestAPI()
                };

                recognition.onresult = function (event) { //when identifying any result
                    var interim_transcript = '';
                    for (var i = event.resultIndex; i < event.results.length; ++i) { //For each identification result
                        if (event.results[i].isFinal) {
                            // final_transcript += event.results[i][0].transcript; 
                        } else {
                            interim_transcript += event.results[i][0].transcript;
                        }
                    }
                    if (interim_transcript.trim().length > 0)
                        tempBox.value = interim_transcript;
                };
            }

            /* chrome SST end */

            let conv = new Array();
            conv = ["", ""];
            function showRequest(daText) {
                document.getElementsByClassName("userRequest")[0].innerHTML = daText;
            }

            function showError(daText) {

                var conversationDiv = document.getElementById('conversation');
                var errorPara = document.createElement("P");
                errorPara.className = 'chatError';
                errorPara.appendChild(document.createTextNode(daText));
                conversationDiv.appendChild(errorPara);
                conversationDiv.scrollTop = conversationDiv.scrollHeight;
            }

            function showResponse(Response) {
                document.getElementsByClassName("Response")[0].innerHTML = Response.message;
            }
            function botReturn() {
                var voiceName;
                var voiceType;
                langCombo = document.getElementById("langCombo");
                recognition.lang = langCombo.value;
                if (webRtcPlayerObj) {
                    webRtcPlayerObj.stopAudio();
                }

                switch (recognition.lang) {
                    case "en-US": {
                        voiceName = "Bridget";
                        voiceType = "N16";
                        break;
                    }
                    case "cmn-Hant-TW": {
                        voiceName = "Yafang";
                        voiceType = "P16";
                        break;
                    }
                    case "id-ID": {
                        voiceName = "Annisa";
                        voiceType = "N16";
                        break;
                    }
                    case "ja-JP": {
                        voiceName = "Risa";
                        voiceType = "N16";
                        break;
                    }
                    default: {
                        break;
                    }
                }

                emitUIInteraction({ TTSEngine: 1 });
                emitUIInteraction({ TTSVoiceName: voiceName });
                emitUIInteraction({ TTSVoiceType: voiceType });
                emitUIInteraction({ TTSText: document.getElementsByClassName('Response')[0].innerHTML });
                emitUIInteraction({ Animation: '1,1' });

            }

          function requestAPI(event) {
    var wisdomText = document.getElementById('wisdom');
    var wisdom = wisdomText.value.trim();
    conv.unshift(wisdom);
    if (conv.length > 2) {
        conv.pop();
    }

    var wisdomList = conv[0] + "." + conv[1];
    console.log("wisdomList:", wisdomList);
    console.log("array:", conv);
    console.log("array len:", conv.length);
    console.log('conv[0] typeof:', typeof conv[0]);

    showRequest(wisdomText.value);
    wisdomText.value = '';
    wisdomText.locked = true;

    // Mendapatkan ID, agent, dan token dari localStorage (sesuaikan dengan key yang digunakan)
    var userId = localStorage.getItem('userId');
    var agentId = localStorage.getItem('agent');
    var token = localStorage.getItem('token');

    // Matikan speech recognition jika sedang aktif
    if (isSpeechRecognitionActive) {
        recognition.stop();
        isSpeechRecognitionActive = false;
    }

    var request = new XMLHttpRequest();
    request.open('POST', 'https://chatdoc.cakra.ai/api/v2-polri');
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer ' + token + userId + agentId);

    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status == 200) {
                console.log('Status:', this.status);
                console.log('Headers:', this.getAllResponseHeaders());
                let res = this.responseText;
                const resobj = JSON.parse(res);

                // Periksa jenis respons
                if (resobj.type === 'AUDIO_PLAY_START') {
                    // Tidak lakukan apa-apa atau hentikan pemutaran audio sesuai kebutuhan
                    // Jangan memasukkan teks dari respons ini ke dalam input wisdom
                } else {
                    const responseField = resobj.speak;
                    console.log("req:", wisdom);
                    console.log("res:", responseField);

                    if (wisdom.trim().length > 0) {
                        // Hanya menampilkan respons jika ada pertanyaan yang dikirim
                        document.getElementsByClassName("Response")[0].innerHTML = responseField;
                        botReturn();

                        // Menghentikan speech recognition saat ada respons
                        if (recognition) {
                            recognition.stop();
                        }
                    } else {
                        // Tidak menampilkan respons jika tidak ada pertanyaan
                        document.getElementsByClassName("Response")[0].innerHTML = '';
                    }

                    // Update mic button for mobile
                    const startImgMobile = document.getElementById('start_img_mobile');
                    startImgMobile.src = './images/mic.gif';
                    document.getElementById('start_button_mobile').dataset.active = 'false';
                }
            } else {
                document.getElementsByClassName("Response")[0].innerHTML = 'Open AI status : ' + this.status;
                botReturn();
            }
        }
    };

    if (wisdom.trim().length > 0) {
        var body = {
            'query': wisdom,
            'id': '89089225',
            'agent': 'polri',
            'max_tokens': 4000,
            'temperature': 1.0
        };

        request.send(JSON.stringify(body));
    } else {
        wisdomText.locked = false;
    }

    // Mencegah perilaku default tombol "Enter" pada form
    if (event) {
        event.preventDefault();
    }
}


            document.addEventListener("DOMContentLoaded", function () {
                var wisdomInput = document.getElementById('wisdom');

                wisdomInput.addEventListener('keypress', function (event) {
                    if (event.key === 'Enter') {
                        event.preventDefault(); // Menghentikan perilaku default tombol Enter
                        requestAPI(); // Panggil fungsi requestAPI() untuk mengirim teks ke server
                    }
                });
            });