import React from 'react';

function Header({approvers, quorum}) {
  return (
    <header>
      <h2>Approvers</h2>
      <br />
      <ul class="list-group">
        {approvers.map(num => (
          <li class="list-group-item">{num}</li>
            ))}
      </ul>
      <h2>Quorum:</h2> {quorum}
    </header>
  );
}

export default Header;
