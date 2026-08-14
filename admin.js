(function () {
    'use strict';

    const GOOGLE_SCRIPT_URL =
        'https://script.google.com/macros/s/AKfycbylLQXE0NMkIaoDWybMwcb4Rz75z5nvOaXDpLjfCpdnJv_4_JO19ofe_moFbuic7yw4PA/exec';

    const GOOGLE_SCRIPT_FETCH_TIMEOUT_MS = 15000;

    const ADMIN_KEY_STORAGE_KEY =
        'forbidden-library-admin-key';

    let orders = [];
    let activeFilter = 'all';
    let activeArchiveId = null;
    let modalLastFocus = null;
    let toastTimer = null;
    let bodyScrollLockY = 0;

    function getAdminKey() {
        let adminKey = sessionStorage.getItem(
            ADMIN_KEY_STORAGE_KEY
        );

        if (!adminKey) {
            adminKey = window.prompt('請輸入管理密鑰：');

            if (!adminKey) {
                throw new Error('尚未輸入管理密鑰。');
            }

            adminKey = adminKey.trim();

            if (!adminKey) {
                throw new Error('管理密鑰不可為空白。');
            }

            sessionStorage.setItem(
                ADMIN_KEY_STORAGE_KEY,
                adminKey
            );
        }

        return adminKey;
    }

    function clearAdminKey() {
        sessionStorage.removeItem(
            ADMIN_KEY_STORAGE_KEY
        );
    }

    function lockPageScroll() {
        bodyScrollLockY =
            window.scrollY ||
            window.pageYOffset ||
            0;

        document.documentElement.classList.add(
            'admin-page--modal-open'
        );

        document.body.classList.add(
            'admin-page--modal-open'
        );

        document.body.style.top =
            `-${bodyScrollLockY}px`;
    }

    function unlockPageScroll() {
        document.documentElement.classList.remove(
            'admin-page--modal-open'
        );

        document.body.classList.remove(
            'admin-page--modal-open'
        );

        document.body.style.top = '';

        window.scrollTo(0, bodyScrollLockY);
    }

    function formatCurrency(amount) {
        const value = Number(amount);

        if (
            !Number.isFinite(value) ||
            value <= 0
        ) {
            return '—';
        }

        return `NT$ ${value.toLocaleString('zh-TW')}`;
    }

    function displayValue(value) {
        const text = String(value ?? '').trim();

        return text || '—';
    }

    function escapeHtml(text) {
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function findOrderByArchiveId(archiveId) {
        return (
            orders.find(
                (order) =>
                    order.archiveId === archiveId
            ) || null
        );
    }

    function normalizeOrder(order) {
        return {
            createdAt:
                order?.createdAt ||
                order?.['建立時間'] ||
                '',
    
            archiveId:
                String(
                    order?.archiveId ||
                    order?.['館藏編號'] ||
                    ''
                ).trim(),
    
            planName:
                String(
                    order?.planName ||
                    order?.['方案名稱'] ||
                    ''
                ).trim(),
    
            planPrice:
                order?.planPrice ??
                order?.['方案金額'] ??
                '',
    
            totalAmount:
                order?.totalAmount ??
                order?.['總金額'] ??
                order?.planPrice ??
                order?.['方案金額'] ??
                '',
    
            realName:
                String(
                    order?.realName ||
                    order?.['真實姓名'] ||
                    ''
                ).trim(),
    
            email:
                String(
                    order?.email ||
                    order?.['Email'] ||
                    ''
                ).trim(),
    
            phone:
                String(
                    order?.phone ||
                    order?.['手機號碼'] ||
                    ''
                ).trim(),
    
            instagram:
                String(
                    order?.instagram ||
                    order?.['Instagram'] ||
                    ''
                ).trim(),
    
            publicName:
                String(
                    order?.publicName ||
                    order?.['公開署名'] ||
                    ''
                ).trim(),
    
            shippingMethod:
                String(
                    order?.shippingMethod ||
                    order?.['寄送方式'] ||
                    ''
                ).trim(),
    
            recipientName:
                String(
                    order?.recipientName ||
                    order?.['收件人姓名'] ||
                    ''
                ).trim(),
    
            recipientPhone:
                String(
                    order?.recipientPhone ||
                    order?.['收件人電話'] ||
                    ''
                ).trim(),
    
            storeName:
                String(
                    order?.storeName ||
                    order?.['7-ELEVEN 門市名稱'] ||
                    ''
                ).trim(),
    
            storeCode:
                String(
                    order?.storeCode ||
                    order?.['7-ELEVEN 門市店號'] ||
                    ''
                ).trim(),
    
            storeAddress:
                String(
                    order?.storeAddress ||
                    order?.['7-ELEVEN 門市地址'] ||
                    ''
                ).trim(),
    
            postalCode:
                String(
                    order?.postalCode ||
                    order?.['郵遞區號'] ||
                    ''
                ).trim(),
    
            city:
                String(
                    order?.city ||
                    order?.['縣市'] ||
                    ''
                ).trim(),
    
            district:
                String(
                    order?.district ||
                    order?.['區域'] ||
                    ''
                ).trim(),
    
            address:
                String(
                    order?.address ||
                    order?.['地址'] ||
                    ''
                ).trim(),
    
            note:
                String(
                    order?.note ||
                    order?.['備註'] ||
                    ''
                ).trim(),
    
            paymentStatus:
                String(
                    order?.paymentStatus ||
                    order?.['付款狀態'] ||
                    '待匯款'
                ).trim(),
    
            paymentDate:
                String(
                    order?.paymentDate ||
                    order?.['匯款日期'] ||
                    ''
                ).trim(),
    
            paymentAmount:
                order?.paymentAmount ??
                order?.['匯款金額'] ??
                '',
    
            bankLast5:
                String(
                    order?.bankLast5 ||
                    order?.['末五碼'] ||
                    ''
                ).trim(),
    
            paymentNote:
                String(
                    order?.paymentNote ||
                    order?.['付款備註'] ||
                    ''
                ).trim(),
    
            shippingStatus:
                String(
                    order?.shippingStatus ||
                    order?.['寄送狀態'] ||
                    '尚未處理'
                ).trim(),
    
            trackingNumber:
                String(
                    order?.trackingNumber ||
                    order?.['物流編號'] ||
                    ''
                ).trim(),
    
            adminNote:
                String(
                    order?.adminNote ||
                    order?.['管理備註'] ||
                    ''
                ).trim()
        };
    }
    function updateStats() {
        const awaitingPayment = orders.filter(
            (order) => order.paymentStatus === '待匯款'
        ).length;

        const pendingReview = orders.filter(
            (order) => order.paymentStatus === '待確認'
        ).length;

        const readyShip = orders.filter(
            (order) => order.shippingStatus === '待寄送'
        ).length;

        const shipped = orders.filter(
            (order) =>
                ['已寄出', '已完成'].includes(
                    order.shippingStatus
                )
        ).length;

        const awaitingEl = document.getElementById(
            'admin-stat-awaiting-payment'
        );

        const pendingEl = document.getElementById(
            'admin-stat-pending-review'
        );

        const readyEl = document.getElementById(
            'admin-stat-ready-ship'
        );

        const shippedEl = document.getElementById(
            'admin-stat-shipped'
        );

        if (awaitingEl) {
            awaitingEl.textContent =
                String(awaitingPayment);
        }

        if (pendingEl) {
            pendingEl.textContent =
                String(pendingReview);
        }

        if (readyEl) {
            readyEl.textContent =
                String(readyShip);
        }

        if (shippedEl) {
            shippedEl.textContent =
                String(shipped);
        }
    }

    function renderOrdersTableMessage(
        message,
        type
    ) {
        const tableBody =
            document.getElementById(
                'admin-orders-body'
            );

        if (!tableBody) return;

        const messageClass =
            type === 'error'
                ? 'admin-table__message admin-table__message--error'
                : 'admin-table__message';

        tableBody.innerHTML = `
            <tr>
                <td
                    colspan="7"
                    class="${messageClass}"
                >
                    ${escapeHtml(message)}
                </td>
            </tr>
        `;
    }

    function renderOrdersTable() {
        const keyword = (
            document.getElementById('admin-order-search')?.value || ''
        )
            .trim()
            .toLowerCase();
        const tableBody =
            document.getElementById(
                'admin-orders-body'
            );

        if (!tableBody) return;

        const filteredOrders = orders.filter((order) => {
            const matchKeyword =
                !keyword ||
                [
                    order.archiveId,
                    order.planName,
                    order.publicName,
                    order.realName,
                    order.email
                ]
                    .join(' ')
                    .toLowerCase()
                    .includes(keyword);
        
            const matchFilter =
                activeFilter === 'all' ||
                order.paymentStatus === activeFilter ||
                order.shippingStatus === activeFilter;
        
            return matchKeyword && matchFilter;
        }); 
        
        if (!filteredOrders.length) {
            renderOrdersTableMessage(
                '目前沒有訂單資料。'
            );

            return;
        }

        tableBody.innerHTML = filteredOrders
            .map(
                (order) => `
                    <tr data-archive-id="${escapeHtml(
                        order.archiveId
                    )}">
                        <td data-label="館藏編號">
                            ${escapeHtml(
                                order.archiveId
                            )}
                        </td>

                        <td data-label="方案">
                            ${escapeHtml(
                                displayValue(
                                    order.planName
                                )
                            )}
                        </td>

                        <td data-label="公開署名">
                            ${escapeHtml(
                                displayValue(
                                    order.publicName
                                )
                            )}
                        </td>

                        <td data-label="金額">
                            ${escapeHtml(
                                formatCurrency(
                                    order.totalAmount
                                )
                            )}
                        </td>

                        <td data-label="付款狀態">
                            <span class="admin-badge admin-badge--payment">
                                ${escapeHtml(
                                    order.paymentStatus
                                )}
                            </span>
                        </td>

                        <td data-label="寄送狀態">
                            <span class="admin-badge admin-badge--shipping">
                                ${escapeHtml(
                                    order.shippingStatus
                                )}
                            </span>
                        </td>

                        <td data-label="操作">
                            <button
                                type="button"
                                class="admin-table__action"
                                data-action="view-order"
                            >
                                查看
                            </button>
                        </td>
                    </tr>
                `
            )
            .join('');
    }

    function setTextContent(id, value) {
        const element =
            document.getElementById(id);

        if (element) {
            element.textContent =
                displayValue(value);
        }
    }

    function fillOrderModal(order) {
        setTextContent(
            'admin-detail-archive-id',
            order.archiveId
        );

        setTextContent(
            'admin-detail-plan-name',
            order.planName
        );

        setTextContent(
            'admin-detail-plan-price',
            formatCurrency(
                order.totalAmount ||
                order.planPrice
            )
        );

        setTextContent(
            'admin-detail-real-name',
            order.realName
        );

        setTextContent(
            'admin-detail-email',
            order.email
        );

        setTextContent(
            'admin-detail-phone',
            order.phone
        );

        setTextContent(
            'admin-detail-instagram',
            order.instagram
        );

        setTextContent(
            'admin-detail-public-name',
            order.publicName
        );

        setTextContent(
            'admin-detail-shipping-method',
            order.shippingMethod
        );

        setTextContent(
            'admin-detail-recipient-name',
            order.recipientName
        );

        setTextContent(
            'admin-detail-recipient-phone',
            order.recipientPhone
        );

        setTextContent(
            'admin-detail-shipping-info',
            order.shippingInfo
        );

        setTextContent(
            'admin-detail-transfer-date',
            order.transferDate
        );

        setTextContent(
            'admin-detail-transfer-amount',
            order.transferAmount
                ? formatCurrency(
                    order.transferAmount
                )
                : '—'
        );

        setTextContent(
            'admin-detail-transfer-last-five',
            order.transferLastFive
        );

        const paymentStatusEl =
            document.getElementById(
                'admin-detail-payment-status'
            );

        const shippingStatusEl =
            document.getElementById(
                'admin-detail-shipping-status'
            );

        const trackingNumberEl =
            document.getElementById(
                'admin-detail-tracking-number'
            );
            const copyTrackingButton =
    document.getElementById('admin-copy-tracking-number');

        const adminNoteEl =
            document.getElementById(
                'admin-detail-admin-note'
            );

        if (paymentStatusEl) {
            paymentStatusEl.value =
                order.paymentStatus;
        }

        if (shippingStatusEl) {
            shippingStatusEl.value =
                order.shippingStatus;
        }

        if (trackingNumberEl) {
            trackingNumberEl.value =
                order.trackingNumber || '';
        }
        if (copyTrackingButton) {
            copyTrackingButton.onclick = async () => {
                const text = trackingNumberEl.value.trim();
        
                if (!text) {
                    showToast('目前沒有物流編號');
                    return;
                }
        
                try {
                    await navigator.clipboard.writeText(text);
                    showToast('物流編號已複製');
                } catch (err) {
                    trackingNumberEl.select();
                    document.execCommand('copy');
                    showToast('物流編號已複製');
                }
            };
        }

        if (adminNoteEl) {
            adminNoteEl.value =
                order.adminNote || '';
        }

        const feedbackEl =
            document.getElementById(
                'admin-order-modal-feedback'
            );

        if (feedbackEl) {
            feedbackEl.textContent = '';
            feedbackEl.hidden = true;
        }
    }
    async function openOrderModal(archiveId) {
        const modal = document.getElementById(
            'admin-order-modal'
        );

        const panel = document.getElementById(
            'admin-order-modal-panel'
        );

        const feedbackEl = document.getElementById(
            'admin-order-modal-feedback'
        );

        if (!archiveId || !modal || !panel) {
            return;
        }

        activeArchiveId = archiveId;
        modalLastFocus = document.activeElement;

        if (feedbackEl) {
            feedbackEl.textContent =
                '正在讀取館藏資料……';

            feedbackEl.hidden = false;
        }

        modal.hidden = false;
        lockPageScroll();

        const modalBody = modal.querySelector(
            '.admin-modal__body'
        );

        if (modalBody) {
            modalBody.scrollTop = 0;
        }

        try {
            const response = await fetch(
                GOOGLE_SCRIPT_URL,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'text/plain;charset=utf-8'
                    },

                    body: JSON.stringify({
                        action:
                            'getAdminOrderDetail',

                        archiveId:
                            archiveId,

                        adminKey:
                            getAdminKey()
                    })
                }
            );

            const result =
                await response.json();

            if (!result.success) {
                if (
                    result.message ===
                    '管理驗證失敗。'
                ) {
                    clearAdminKey();
                }

                throw new Error(
                    result.message ||
                    '無法讀取完整訂單資料。'
                );
            }

            if (!result.order) {
                throw new Error(
                    '訂單資料格式不正確。'
                );
            }

            const listOrder =
                findOrderByArchiveId(
                    archiveId
                ) || {};

            const fullOrder =
                normalizeOrder({
                    ...listOrder,
                    ...result.order
                });

            fillOrderModal(fullOrder);

            const closeBtn =
                document.getElementById(
                    'admin-order-modal-close'
                );

            closeBtn?.focus();

        } catch (error) {
            if (feedbackEl) {
                feedbackEl.textContent =
                    error instanceof Error
                        ? error.message
                        : '目前無法讀取訂單資料。';

                feedbackEl.hidden = false;
            }
        }
    }

    function closeOrderModal() {
        const modal =
            document.getElementById(
                'admin-order-modal'
            );

        if (!modal || modal.hidden) {
            return;
        }

        modal.hidden = true;
        unlockPageScroll();
        activeArchiveId = null;

        const feedbackEl =
            document.getElementById(
                'admin-order-modal-feedback'
            );

        if (feedbackEl) {
            feedbackEl.textContent = '';
            feedbackEl.hidden = true;
        }

        if (
            modalLastFocus &&
            typeof modalLastFocus.focus ===
                'function'
        ) {
            modalLastFocus.focus();
        }
    }

    function showToast(message) {
        const toast =
            document.getElementById(
                'admin-toast'
            );

        if (!toast) {
            return;
        }

        toast.textContent = message;
        toast.hidden = false;

        window.clearTimeout(toastTimer);

        toastTimer = window.setTimeout(
            () => {
                toast.hidden = true;
                toast.textContent = '';
            },
            2800
        );
    }

    async function saveOrderChanges() {
        if (!activeArchiveId) {
            return;
        }

        const paymentStatusEl =
            document.getElementById(
                'admin-detail-payment-status'
            );

        const shippingStatusEl =
            document.getElementById(
                'admin-detail-shipping-status'
            );

        const trackingNumberEl =
            document.getElementById(
                'admin-detail-tracking-number'
            );

        const adminNoteEl =
            document.getElementById(
                'admin-detail-admin-note'
            );

        const feedbackEl =
            document.getElementById(
                'admin-order-modal-feedback'
            );

        const payload = {
            action:
                'updateAdminOrder',

            archiveId:
                activeArchiveId,

            adminKey:
                getAdminKey(),

            paymentStatus:
                paymentStatusEl?.value ||
                '待匯款',

            shippingStatus:
                shippingStatusEl?.value ||
                '尚未處理',

            trackingNumber:
                trackingNumberEl?.value.trim() ||
                '',

            adminNote:
                adminNoteEl?.value.trim() ||
                ''
        };

        if (feedbackEl) {
            feedbackEl.textContent =
                '正在儲存變更……';

            feedbackEl.hidden = false;
        }

        try {
            const response = await fetch(
                GOOGLE_SCRIPT_URL,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'text/plain;charset=utf-8'
                    },

                    body:
                        JSON.stringify(payload)
                }
            );

            const result =
                await response.json();

            if (!result.success) {
                if (
                    result.message ===
                    '管理驗證失敗。'
                ) {
                    clearAdminKey();
                }

                throw new Error(
                    result.message ||
                    '儲存失敗。'
                );
            }

            const order =
                findOrderByArchiveId(
                    activeArchiveId
                );

            if (order) {
                order.paymentStatus =
                    payload.paymentStatus;

                order.shippingStatus =
                    payload.shippingStatus;

                order.trackingNumber =
                    payload.trackingNumber;

                order.adminNote =
                    payload.adminNote;
            }

            renderOrdersTable();
            updateStats();

            if (feedbackEl) {
                feedbackEl.textContent = '';
                feedbackEl.hidden = true;
            }

            showToast(
                '訂單資料已更新'
            );

        } catch (error) {
            if (feedbackEl) {
                feedbackEl.textContent =
                    error instanceof Error
                        ? error.message
                        : '目前無法儲存訂單資料。';

                feedbackEl.hidden = false;
            }
        }
    }
    async function fetchAdminOrders() {
        const controller =
            new AbortController();

        const timeoutId =
            window.setTimeout(
                () => controller.abort(),
                GOOGLE_SCRIPT_FETCH_TIMEOUT_MS
            );

        try {
            const response = await fetch(
                GOOGLE_SCRIPT_URL,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'text/plain;charset=utf-8'
                    },

                    body: JSON.stringify({
                        action: 'getAdminOrders',
                        adminKey: getAdminKey()
                      }),

                    signal:
                        controller.signal
                }
            );

            const result =
                await response.json();

            if (!result.success) {
                throw new Error(
                    result.message ||
                    '無法載入訂單資料。'
                );
            }

            if (
                !Array.isArray(
                    result.orders
                )
            ) {
                throw new Error(
                    '無法載入訂單資料。'
                );
            }

            orders =
                result.orders.map(
                    normalizeOrder
                );

            renderOrdersTable();
            updateStats();

        } catch (error) {
            orders = [];

            updateStats();

            renderOrdersTableMessage(
                error instanceof Error &&
                error.name === 'AbortError'
                    ? '載入逾時，請稍後再試。'
                    : (
                        error instanceof Error &&
                        error.message
                            ? error.message
                            : '目前無法連線至管理後台，請稍後再試。'
                    ),
                'error'
            );

        } finally {
            window.clearTimeout(
                timeoutId
            );
        }
    }

    function initOrderModal() {
        const modal =
            document.getElementById(
                'admin-order-modal'
            );

        const panel =
            document.getElementById(
                'admin-order-modal-panel'
            );

        const backdrop =
            document.getElementById(
                'admin-order-modal-backdrop'
            );

        const closeBtn =
            document.getElementById(
                'admin-order-modal-close'
            );

        const cancelBtn =
            document.getElementById(
                'admin-order-modal-cancel'
            );

        const form =
            document.getElementById(
                'admin-order-form'
            );

        if (
            !modal ||
            modal.dataset.modalBound ===
                'true'
        ) {
            return;
        }

        modal.dataset.modalBound =
            'true';

        closeBtn?.addEventListener(
            'click',
            closeOrderModal
        );

        cancelBtn?.addEventListener(
            'click',
            closeOrderModal
        );

        backdrop?.addEventListener(
            'click',
            closeOrderModal
        );

        form?.addEventListener(
            'submit',
            (event) => {
                event.preventDefault();
                saveOrderChanges();
            }
        );

        panel?.addEventListener(
            'keydown',
            (event) => {
                if (
                    event.key ===
                    'Escape'
                ) {
                    event.preventDefault();
                    closeOrderModal();
                }
            }
        );
    }

    function initAdminPanel() {
        const tableBody =
            document.getElementById(
                'admin-orders-body'
            );

        if (
            !tableBody ||
            tableBody.dataset.adminBound ===
                'true'
        ) {
            return;
        }

        tableBody.dataset.adminBound =
            'true';

        renderOrdersTableMessage(
            '載入訂單中……'
        );

        initOrderModal();

        tableBody.addEventListener(
            'click',
            (event) => {
                const button =
                    event.target.closest(
                        '[data-action="view-order"]'
                    );

                if (!button) {
                    return;
                }

                const row =
                    button.closest('tr');

                const archiveId =
                    row?.dataset.archiveId ||
                    '';

                if (!archiveId) {
                    return;
                }

                openOrderModal(
                    archiveId
                );
            }
        );

        const searchInput = document.getElementById(
            'admin-order-search'
        );
        
        const clearButton = document.getElementById(
            'admin-order-search-clear'
        );
        
        searchInput?.addEventListener('input', () => {
            renderOrdersTable();
        
            if (clearButton) {
                clearButton.hidden = !searchInput.value;
            }
        });
        
        clearButton?.addEventListener('click', () => {
            searchInput.value = '';
            clearButton.hidden = true;
            renderOrdersTable();
            searchInput.focus();
        });
        const filterButtons = document.querySelectorAll(
            '.admin-filter'
        );
        
        filterButtons.forEach((button) => {
            button.addEventListener('click', () => {
                activeFilter =
                    button.dataset.filter || 'all';
        
                filterButtons.forEach((item) => {
                    item.classList.remove('is-active');
                });
        
                button.classList.add('is-active');
        
                renderOrdersTable();
            });
        });

     // 點擊上方統計卡
const statsSection = document.querySelector('.admin-stats');

statsSection?.addEventListener('click', (event) => {
    const card = event.target.closest('.admin-stat-card');

    if (!card || !statsSection.contains(card)) {
        return;
    }

    activeFilter = card.dataset.filter || 'all';

    document.querySelectorAll('.admin-filter').forEach((button) => {
        button.classList.toggle('is-active', button.dataset.filter === activeFilter);
    });

    document.querySelectorAll('.admin-stat-card').forEach((item)=>{
        item.classList.toggle('is-active', item===card);
    });

    renderOrdersTable();
});

fetchAdminOrders();
}
    

    document.addEventListener(
        'DOMContentLoaded',
        initAdminPanel
    );

})();