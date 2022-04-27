import { render } from '~src/utils/render';
import '../modal/modal.scss';

export class SingleModal {
    constructor() {
        if (SingleModal.__instance) {
            return SingleModal.__instance;
        }

        const elModalContent = document.createElement('div');
        elModalContent.classList.add('modal__content');
        elModalContent.setAttribute(this.contentName, '');
        const elModal = document.createElement('div');
        elModal.classList.add('modal', 'modal-hidden');
        elModal.appendChild(elModalContent);

        document.body.appendChild(elModal);

        this.attach();

        this.el = elModal;
        this.elContent = elModalContent;

        SingleModal.__instance = this;
    }

    attach() {
        document.body.addEventListener('click', (event) => {
            if (event.target === this.getContent()) {
                this.hide();
            }
        });
    }

    get contentName() {
        return 'data-single-modal-content';
    }

    public getContent() {
        return this.el;
    }

    public show(block) {
        render(`[${this.contentName}]`, block);
        this.getContent()?.classList.remove('modal-hidden');
    }

    public hide() {
        this.elContent.innerHTML = '';
        this.getContent()?.classList.add('modal-hidden');
    }
}

export default new SingleModal();
