(function () {
    const bookBtn = document.getElementById('bookBtn');
    const banner = document.getElementById('banner');
    const bannerText = document.getElementById('bannerText');
    const fullName = document.getElementById('fullName');
    const phone = document.getElementById('phone');
    const timePicker = document.getElementById('timePicker');
    const massageType = document.getElementById('massageType');
    const aromaOil = document.getElementById('aromaOil');
    const pressureValue = document.getElementById('pressureValue');
    const fileInput = document.getElementById('fileInput');
    const fileName = document.getElementById('fileName');
    const prioritySegmented = document.getElementById('prioritySegmented'); 
    const timeSegmented = document.getElementById('timeSegmented'); 
    const bannerCheck = banner.querySelector('.check');

    // آیکون‌های بنر
    const checkIcon = '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>';
    const crossIcon = '<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

    let priority = 'normal';

    // تاریخ پیش‌فرض
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');



    // فایل
    fileInput.addEventListener('change', () => {
        fileName.textContent = fileInput.files.length > 0 ? fileInput.files[0].name : 'هیچ فایلی انتخاب نشده';
    });



    // نمایش توضیحات مربوط به گزینه‌ی انتخاب‌شده
    const optionDescs = document.querySelectorAll('.option-desc');

    timeSegmented.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            // حذف active از همه‌ی دکمه‌ها
            timeSegmented.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            priority = btn.dataset.value;

            // نمایش توضیح مربوطه
            optionDescs.forEach(desc => {
                desc.classList.toggle('active', desc.dataset.desc === priority);
            });
        });
    });

    const subOptionGroups = document.querySelectorAll('.sub-options');

    prioritySegmented.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            // حذف active از دکمه‌ها
            prioritySegmented.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            priority = btn.dataset.value;

            // نمایش گروه زیرگزینه‌ی مربوطه
            subOptionGroups.forEach(group => {
                group.classList.toggle('active', group.dataset.group === priority);
            });

            if (navigator.vibrate) navigator.vibrate(8);
        });
    });

    // در تابع handleBooking، زیرگزینه‌ی انتخاب‌شده رو هم بگیر
    function getSelectedSubOption() {
        const activeGroup = document.querySelector('.sub-options.active');
        if (!activeGroup) return null;
        const selected = activeGroup.querySelector('input[type="radio"]:checked');
        if (!selected) return null;
        const rowLabel = selected.closest('.row').querySelector('.row-label').textContent;
        return rowLabel;
    }

    // بنر
    let bannerTimer = null;
    function showBanner(text, isError = false) {
        bannerText.textContent = text;
        banner.classList.toggle('error', isError);
        bannerCheck.innerHTML = isError ? crossIcon : checkIcon;
        banner.classList.add('show');
        clearTimeout(bannerTimer);
        bannerTimer = setTimeout(() => banner.classList.remove('show'), 3000);
    }

    function handleBooking() {
        const name = fullName.value.trim();
        const phoneVal = phone.value.trim();

        if (!name) { showBanner('نام و نام خانوادگی را وارد کنید', true); fullName.focus(); return; }
        if (!phoneVal) { showBanner('شماره تماس را وارد کنید', true); phone.focus(); return; }

        const digits = phoneVal.replace(/\D/g, '');
        if (digits.length < 8) { showBanner('شماره تماس معتبر نیست', true); phone.focus(); return; }

        const selected = new Date(date);
        const todayMid = new Date();
        todayMid.setHours(0, 0, 0, 0);

        const timeText = timePicker.value || '۱۰:۳۰';
        const typeText = massageType.value;
        const aromaText = aromaOil.checked ? ' با روغن آروماتیک' : '';
        const priorityMap = { low: 'عادی', normal: 'معمولی', high: 'فوری' };

        if (navigator.vibrate) navigator.vibrate(10);
        showBanner(`رزرو ${typeText}${aromaText} · ${timeText} · ${priorityMap[priority]}`);
    }

    bookBtn.addEventListener('click', handleBooking);
    document.getElementById('bookingForm').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            handleBooking();
        }
    });
})();