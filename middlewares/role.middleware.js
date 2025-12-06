export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({ error: 'No autorizado: sin rol de usuario' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Prohibido: permisos insuficientes',
        required: allowedRoles,
        current: req.user.role
      });
    }

    next();
  };
}
