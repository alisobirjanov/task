import React from 'react'

export const Message = ({msg}) => {
    return (
      <div className="col">
        <div class="card-panel teal" style={{width: '400px'}}>
          <span class="white-text">
            {msg.text}
          </span>
        </div>
      </div>
    );
} 