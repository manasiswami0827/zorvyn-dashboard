function RoleSwitcher({ role, setRole }) {
  return (
    <div>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="form-input"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
}
export default RoleSwitcher;