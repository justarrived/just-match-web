class ApiLink {
  // API fields
  public href: string;
  public meta: any;

  public constructor(link: any) {
    if (typeof link === 'string') {
      this.href = link;
    } else {
      this.href = link.href;
      this.meta = link.meta;
    }
  }
}

class ApiErrorSource {
  // API fields
  public parameter: string;
  public pointer: string;

  // Client fields
  public attribute: string;

  public constructor(source: any) {
    if (source) {
      const pointer = source.pointer;
      const attributeName = pointer.substr(pointer.lastIndexOf('/') + 1);

      this.attribute = attributeName;
      this.parameter = source.paramter;
    }
  }
}

export class ApiError {
  // API fields
  public code: string;
  public detail: string;
  public id: string;
  public links: any;
  public meta: any;
  public source: ApiErrorSource;
  public status: number;
  public title: string;

  // Client fields
  public aboutLink: ApiLink;

  public constructor(private error: any) {
    this.code = error.code;
    this.detail = error.detail;
    this.id = error.id;
    this.meta = error.meta;
    this.source = new ApiErrorSource(error.source);
    this.status = error.status;
    this.title = error.title;

    this.setLinks(error);
  }

  public get attribute(): string {
    return this.source && this.source.attribute;
  }

  public get httpStatus(): number {
    return this.status;
  }

  private setLinks(error): void {
    for (let key in error.links) {
      if (key === 'about') {
        this.aboutLink = new ApiLink(error.links[key]);
      }
    }
  }
}

export class ApiErrors {
  public constructor(private rawErrors: Array<any>) {
    const errors = rawErrors.map(error => new ApiError(error));
    for (let error of errors) {
      if (error.attribute) {
        if (Array.isArray(this[error.attribute])) {
          this[error.attribute].push(error);
        } else {
          this[error.attribute] = [error];
        }
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

  public hasErrorWithType(fieldName: string, type: string): boolean {
    for (let error of this.errorsFor(fieldName)) {
      if (error.meta && error.meta.type === type) {
        return true;
      }
    }
    return false;
  }
}
