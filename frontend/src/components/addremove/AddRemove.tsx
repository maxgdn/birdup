import * as React from 'react';
import styled from 'styled-components';
import {colors, useStores} from '../../core';
import {useEffect, useState} from 'react';
import { observer } from 'mobx-react'
import {Button} from '../../components';
import { FormAdd, FormSubtract } from 'grommet-icons';
import SightingModel from '../../core/models/SightingModel';
import Bird from '../../core/domain/Bird';

const Container = styled.div`
    display: flex;
    align-items: center;
    & > * {
        margin: 0.2rem;
    }
`;

const Select = styled.select`
    height: 50%;
`;

const Option = styled.option`

`;

const Label = styled.label`

`;

interface AddRemoveProps {
    sighting: SightingModel;
}

const AddRemove: React.FC<AddRemoveProps> = observer((props) => {
    const [bird, setBird] = useState("");
    const {birdStore} = useStores();
    const birds: Bird[] = birdStore.toJS();

    const submit = async () => {
        await props.sighting.addBird(bird);
        await setBird("");
    }

    const remove = async () => {
        await props.sighting.removeBird(bird);
        await setBird("");
    }

    useEffect(() => {
        if(birds.length > 0) setBird(birds[0].id);
    },[])

    return (
        <Container>
            <Label>Select: </Label>
            <Select value={bird} onChange={e => setBird(e.target.value)} type={'text'}>
                {birds.length > 0 ? birds.map((bird: Bird) => {
                    console.log(bird.id);
                    return <Option value={bird.id}>{bird.name}</Option>
                }): null}
            </Select>
            <Button name={""} icon={<FormAdd color={colors.tertiary}/>} onClick={() => submit()}/>
            <Button name={""} icon={<FormSubtract color={colors.tertiary}/>} onClick={() => remove()}/>
        </Container>
    );
});

export default AddRemove;