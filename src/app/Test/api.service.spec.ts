import { HomeForumData } from './../modules/@core/mock/homeForumData';
import { JwtService } from 'src/app/modules/@core';
import { ApiService } from './../modules/@core/services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

describe('ApiService', () => {
    let apiService: ApiService;
    let jwtService: JwtService;
    let httpClientSpy: { get: jasmine.Spy }
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, HttpClientModule],
            providers: [ApiService, JwtService]
        })
    })

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        apiService = new ApiService(httpClientSpy as any, jwtService);
    })

    it("should be ApiService created", () => {
        expect(apiService).toBeTruthy();
    })

    it('Should return a list posts and HttpClient call once', () => {
        let dummyPosts = HomeForumData;
        httpClientSpy.get.and.returnValue(of(dummyPosts));
        apiService.GET('https://forum-stg.ourbetterworld.org/api/tbt/homepage').subscribe(posts => {
            expect(posts).toEqual(HomeForumData);
        })
        expect(httpClientSpy.get.calls.count()).toBe(1);
    })
    it('should have keys(code,payload)', () => {
        let dummyPosts = HomeForumData;
        httpClientSpy.get.and.returnValue(of(dummyPosts));
        apiService.GET('https://forum-stg.ourbetterworld.org/api/tbt/homepage').subscribe(posts => {
            expect(posts).toEqual({ code: dummyPosts.code, payload: dummyPosts.payload });
        })
    })
    it('should return a Object', () => {
        let dummyPosts = HomeForumData;
        httpClientSpy.get.and.returnValue(of(dummyPosts));
        apiService.GET('https://forum-stg.ourbetterworld.org/api/tbt/homepage').subscribe(posts => {
            expect(posts).toEqual(dummyPosts);
        })
    })
})