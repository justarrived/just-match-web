class ApiLink {
  // JSONAPI spec attributes
  href: string;
  meta: any;

  constructor(link: any) {
    if (typeof link === 'string') {
      this.href = link;
    } else {
      this.href = link.href;
      this.meta = link.meta;
    }
  }
}

class ApiErrorSource {
  // JSONAPI spec attributes
  pointer: string;
  parameter: string;

  // Convenience attributes
  attribute: string;

  constructor(source: any) {
    if (source) {
      const pointer = source.pointer;
      const attributeName = pointer.substr(pointer.lastIndexOf('/') + 1);

      this.attribute = attributeName;
      this.parameter = source.paramter;
    }
  }
}

export class ApiError {
  // JSONAPI spec attributes
  id: string;
  status: number;
  code: string;
  title: string;
  detail: string;

  source: ApiErrorSource;
  links: any;
  meta: any;

  // Convenience attributes
  aboutLink: ApiLink;

  constructor(private error: any) {
    this.id = error.id;
    this.status = error.status;
    this.code = error.code;
    this.title = error.title;
    this.detail = error.detail;

    this.source = new ApiErrorSource(error.source);

    this.meta = error.meta;
    this.setLinks(error);
  }

  get attribute(): string {
    return this.source.attribute;
  }

  get httpStatus(): number {
    return this.status;
  }

  private setLinks(error): void {
    for (let key in error.links) {
      const link = new ApiLink(error.links[key]);
      if (key === 'about') {
        this.aboutLink = link;
      }
    }
  }
}

export class ApiErrors {

  constructor(private rawErrors: Array<any>) {
    const errors = rawErrors.map(error => new ApiError(error));
    for (let error of errors) {
      if (Array.isArray(this[error.attribute])) {
        this[error.attribute].push(error);
      } else {
        this[error.attribute] = [error];
      }
    }
  }

  public errorsFor(fieldName: string): ApiError[] {
    if (Array.isArray(this[fieldName])) {
      return this[fieldName];
    } else {
      return [];
    }
  }

  public hasErrorsFor(fieldName: string): boolean {
    if (Array.isArray(this[fieldName])) {
      return this[fieldName].length > 0;
    } else {
      return false;
    }
  }
}
