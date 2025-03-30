"use client";

import { Card, CardContent } from "@/components/ui/card";
import CopyButton from "./CopyButton";

const GPG_KEY = `-----BEGIN PGP PUBLIC KEY BLOCK-----
mDMEZXXl5RYJKwYBBAHaRw8BAQdAo68+Q7WU4C1/e6hIcPqi1vMnG/XG4PEEIrvZ
M5fgZwq0J1N0YW5pc2xhdiBLYXJrYXZpbiA8c3RhbmlzbGF2QGthbW5pLmlvPoiT
BBMWCgA7FiEECrfQv6TEktxbJ4XAB8fGkU69BN0FAmV4rUECGwMFCwkIBwICIgIG
FQoJCAsCBBYCAwECHgcCF4AACgkQB8fGkU69BN1HPQEA9IXG0QbwIA5fgWqc00Hk
tS7ImnCh6hnYJa+zWz5DFYUBANowihKgMMzwbAf/lpRpYVShD6cfBvNR2wzf3V3D
F24LtChTdGFuaXNsYXYgS2Fya2F2aW4gPHN0YW5pc2xhdkBrYW1uaS54eXo+iHwE
MBYKACQWIQQKt9C/pMSS3FsnhcAHx8aRTr0E3QUCZXit+QYdIHNhdmUACgkQB8fG
kU69BN1obAEAuzN7u6aar3iBCa6oGJ4bovaCCce5g71gsX+K4lgBqIwBAJlY1CLs
a+tsNH0lS3R/l2GCtgrY4AdpcV7cKGfHZ+gEiJMEExYKADsWIQQKt9C/pMSS3Fsn
hcAHx8aRTr0E3QUCZXXl5QIbAwULCQgHAgIiAgYVCgkICwIEFgIDAQIeBwIXgAAK
CRAHx8aRTr0E3byWAP98m4i9ZKws6+zMw+deD5oq1oECB/vRltaOC7qpTUjVHgEA
sYEOkRJSorwRutyVVT+tgL8lVfQs19mhB1ERL+CFoge4OARldeXlEgorBgEEAZdV
AQUBAQdAZDNV/NORIyiwR4Lxz6c80S0MHRiSSmUMqD9yp5arA0wDAQgHiHgEGBYK
ACAWIQQKt9C/pMSS3FsnhcAHx8aRTr0E3QUCZXXl5QIbDAAKCRAHx8aRTr0E3QWM
APsEkuefSmzghI0nw+yi4J4zgWPkKmZBTt5bY6ZCYUVWcQEA6c8J21oyv4CmaCmA
IOMKL3+L8sJfA1jRrVXESuA9AQY=
=XpUj
-----END PGP PUBLIC KEY BLOCK-----`;

export default function PgpKey() {
  return (
    <Card className="mb-2">
      <CardContent className="p-3 relative">
        <pre className="p-4 rounded overflow-x-auto text-xs font-mono whitespace-pre-wrap">
          {GPG_KEY}
        </pre>
        <div className="absolute top-4 right-4">
          <CopyButton text={GPG_KEY} displayText="" />
        </div>
      </CardContent>
    </Card>
  );
}
