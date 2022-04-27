import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Block } from '../block';

chai.use(sinonChai);

describe('Block', () => {
    it('Должен установить родительский тег из конструктора', () => {
        const block = new Block('section')

        expect(block._meta.tagName).to.equal('section')
    })

    it('Должен вызвать componentDidUpdate после изменения пропса', () => {
        const componentDidUpdate = sinon.spy();
        const block = new Block('section')

        block.componentDidUpdate = componentDidUpdate;

        block.setProps({ count: 1 })

        expect(componentDidUpdate).to.have.been.callCount(1);
    })
})
