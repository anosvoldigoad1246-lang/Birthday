// New externalized JS (moved from inline script)
// Improvements: focus management, accessibility, avoid clearing date interval, avoid duplicate intervals, Escape-to-close
document.addEventListener('DOMContentLoaded', function () {
    const datetxt = "24 December";
    const datatxtletter = `Happy Birthday to someone truly special! 🥳💫
You bring so much joy, comfort, and light into the lives of everyone around you.
May your day be filled with laughter, surprises, and the kind of happiness that stays forever.
You deserve the best—today and always! ❤️🎂`;
    const titleLetter = "To you";

    const charArrDate = datetxt.split('');
    const charArrDateLetter = datatxtletter.split('');
    const charArrTitle = titleLetter.split('');

    let currentIndex = 0;
    let currentIndexLetter = 0;
    let currentIndexTitle = 0;
    let timeDatetxt = null;
    let intervalContent = null;
    let intervalTitle = null;

    const date__of__birth = document.querySelector(".date__of__birth span");
    const text__letter = document.querySelector(".card2 .card2-content h2");
    const title__letter = document.getElementById("mailTitle"); // now a dedicated span
    const boxMail = document.querySelector('.boxMail');
    const boxMailContainer = document.querySelector('.boxMail-container');
    const btnLetter = document.getElementById('btn__letter');
    const closeBtn = document.querySelector('.boxMail-close');

    // helpers to optionally use jQuery slideDown/slideUp if available
    function slideDown(el) {
        if (!el) return;
        if (window.jQuery && typeof jQuery === 'function' && jQuery(el).slideDown) {
            $(el).slideDown();
        } else {
            el.style.display = 'block';
        }
    }
    function slideUp(el) {
        if (!el) return;
        if (window.jQuery && typeof jQuery === 'function' && jQuery(el).slideUp) {
            $(el).slideUp();
        } else {
            el.style.display = 'none';
        }
    }

    // Start the date typing after a delay
    if (date__of__birth) {
        setTimeout(function () {
            timeDatetxt = setInterval(function () {
                if (currentIndex < charArrDate.length) {
                    date__of__birth.textContent += charArrDate[currentIndex];
                    currentIndex++;
                } else {
                    // Add stars once done
                    const i = document.createElement("i");
                    i.className = "fa-solid fa-star";
                    i.setAttribute('aria-hidden', 'true');
                    const container = document.querySelector(".date__of__birth");
                    if (container) {
                        container.prepend(i);
                        container.appendChild(i.cloneNode(true));
                    }
                    clearInterval(timeDatetxt);
                    timeDatetxt = null;
                }
            }, 100);
        }, 12000);
    }

    function openMail() {
        if (boxMail) {
            boxMail.classList.add("active");
            boxMail.setAttribute('aria-hidden', 'false');
            boxMail.setAttribute('aria-modal', 'true');
        }
        if (boxMailContainer) {
            slideDown(boxMailContainer);
        }
        btnLetter.setAttribute('aria-expanded', 'true');

        // Move focus to close button for accessibility
        if (closeBtn && typeof closeBtn.focus === 'function') {
            closeBtn.focus();
        }

        // Title typing
        if (title__letter) {
            clearInterval(intervalTitle);
            title__letter.textContent = "";
            currentIndexTitle = 0;
            intervalTitle = setInterval(function () {
                if (currentIndexTitle < charArrTitle.length) {
                    title__letter.textContent += charArrTitle[currentIndexTitle];
                    currentIndexTitle++;
                } else {
                    clearInterval(intervalTitle);
                    intervalTitle = null;
                }
            }, 100);
        }

        // Start content typing after a short delay
        setTimeout(function () {
            if (text__letter) {
                clearInterval(intervalContent);
                text__letter.textContent = "";
                currentIndexLetter = 0;
                intervalContent = setInterval(function () {
                    if (currentIndexLetter < charArrDateLetter.length) {
                        text__letter.textContent += charArrDateLetter[currentIndexLetter];
                        currentIndexLetter++;
                    } else {
                        clearInterval(intervalContent);
                        intervalContent = null;
                    }
                }, 30);
            }
        }, 600);
    }

    function closeMail() {
        // Only clear letter-specific intervals; do not clear the date interval
        if (intervalContent) {
            clearInterval(intervalContent);
            intervalContent = null;
        }
        if (intervalTitle) {
            clearInterval(intervalTitle);
            intervalTitle = null;
        }

        // reset indexes and text
        if (title__letter) title__letter.textContent = "";
        if (text__letter) text__letter.textContent = "";
        currentIndexLetter = 0;
        currentIndexTitle = 0;

        // hide mailbox
        if (boxMailContainer) {
            slideUp(boxMailContainer);
        }

        if (boxMail) {
            boxMail.classList.remove("active");
            boxMail.setAttribute('aria-hidden', 'true');
            boxMail.removeAttribute('aria-modal');
        }

        if (btnLetter) {
            btnLetter.setAttribute('aria-expanded', 'false');
            // restore focus to the button
            if (typeof btnLetter.focus === 'function') btnLetter.focus();
        }
    }

    if (btnLetter) {
        btnLetter.addEventListener('click', function () {
            openMail();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            closeMail();
        });
    }

    // close on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            if (boxMail && boxMail.classList.contains('active')) {
                closeMail();
            }
        }
    });
});
