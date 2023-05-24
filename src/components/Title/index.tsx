import React from 'react';

type Props = {
    title: string;
};

const Title = ({ title }: Props) => {
    return (
        <div className="row">
            <div className="col-xs-offset-2 col-xs-8 text-center">
                <div className="page-header">
                    <h2>{title}</h2>
                </div>
            </div>
        </div>
    );
};

export default Title;
