import { BootstrapVue, BTable } from 'bootstrap-vue';
import { shallowMount, createLocalVue } from '@vue/test-utils';

import TdReportEntity from '@/components/report/ReportEntity.vue';

describe('components/report/ReportEntity.vue', () => {
    let propsData, wrapper;

    const getData = () => ({
        outOfScope: false,
        entity: {
            data: {
                name: 'Some threat',
                type: 'td.Actor',
                description: 'Some actor doing some things',
                threats: [
                    {
                        title: 't1',
                        severity: 'High',
                        status: 'Open',
                        description: 'Threat 1',
                        mitigation: 'We did things'
                    },
                    {
                        title: 't2',
                        severity: 'Medium',
                        status: 'Mitigated',
                        description: 'Threat 2',
                        mitigation: 'We did other things'
                    },
                ]
            }
        }
    });

    const setup = (data) => {
        const localVue = createLocalVue();
        localVue.use(BootstrapVue);
        wrapper = shallowMount(TdReportEntity, {
            localVue,
            propsData: {
                outOfScope: data.outOfScope,
                entity: data.entity
            },
            mocks: {
                $t: t => t
            }
        });
    };

    describe('in scope', () => {
        beforeEach(() => {
            propsData = getData();
            setup(propsData);
        });
    
        it('converts things to camel case', () => {
            expect(wrapper.vm.toCamelCase('FooBar')).toEqual('fooBar');
        });
    
        it('displays the name and data type', () => {
            expect(wrapper.find('.entity-title').text())
                .toEqual(`${propsData.entity.data.name} (threatmodel.shapes.actor)`);
        });
    
        it('displays the entity description', () => {
            expect(wrapper.find('.entity-description').text())
                .toEqual(propsData.entity.data.description);
        });
        
        it('has a table with the threats', () => {
            expect(wrapper.findComponent(BTable).exists())
                .toEqual(true);
        });
    });

    describe('out of scope', () => {
        beforeEach(() => {
            propsData = getData();
            propsData.outOfScope = true;
            setup(propsData);
        });
        
        it('has a table with the threats', () => {
            expect(wrapper.findComponent(BTable).exists())
                .toEqual(true);
        });
    });
});
