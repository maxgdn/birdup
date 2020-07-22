import * as React from 'react';
import styled from 'styled-components';
import {colors, useStores} from '../../core';

import {useEffect} from 'react';
import { observer } from 'mobx-react'
import {Button} from '../../components';
import { FormSubtract } from 'grommet-icons';
import BirdModel from '../../core/models/BirdModel';
import Bird from '../../core/domain/Bird';

const Table = styled.table`
    border-collapse: collapse;
    padding: 0.2rem;
    border: 0.02rem solid ${colors.secondary};
`;

const TableHead = styled.th`
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    text-align: left;
    background-color: ${colors.primary};
    color: ${colors.tertiary};
`;

const TableRow = styled.tr`

`;

const TableData = styled.td`
    border: 0.02rem solid ${colors.secondary};
    padding: 0.2rem;
`;

const BirdCollection: React.FC = observer(() => {
    const {birdStore} = useStores();

    
    const birdModels: BirdModel[] = birdStore.birds;

    return (
        <Table>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Genus Name</TableHead>
                <TableHead>Interact</TableHead>
            </TableRow>
            {birdModels.length > 0 ? birdModels.map((birdModel: BirdModel) => {
                
                let bird: Bird = birdModel.toJS();
                return (
                    <TableRow>
                        <TableData>{bird.name}</TableData>
                        <TableData>{bird.genusName}</TableData>
                        <TableData>
                            <Button name={"Remove"} icon={<FormSubtract/>} onClick={() => birdModel.delete()}/>
                        </TableData>
                    </TableRow>
                );
            }) : null}
        </Table>
    );
});

export default BirdCollection;